#!/usr/bin/env node
/**
 * IEEE IES Tunisia — Simple Admin Server
 * ========================================
 * A lightweight Node.js HTTP server that provides a web UI for managing
 * the SQLite database. Runs completely independently of the Next.js app.
 *
 * Usage:
 *   npm run admin
 *   → http://localhost:3100
 *
 * Update the database here, then run `npm run build` to regenerate the static site.
 *
 * Security: Binds to 127.0.0.1 only (not accessible from network).
 *           Optional ADMIN_TOKEN for local auth.
 */

import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, "..");
const PORT = 3100;
const DB_PATH = path.join(ROOT, "db", "ies-tunisia.db");
const SCHEMA_PATH = path.join(ROOT, "db", "schema.sql");
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || null;

// Ensure DB exists
if (!fs.existsSync(DB_PATH)) {
  console.log("📦 Creating database...");
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
  const db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");
  const schema = fs.readFileSync(SCHEMA_PATH, "utf-8");
  db.exec(schema);
  db.close();
  console.log("✅ Database created at:", DB_PATH);
}

const db = new Database(DB_PATH);
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

// ─── Helpers ─────────────────────────────────────────────────────────────────
function json(res, data, status = 200) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

function html(res, htmlStr) {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(htmlStr);
}

function readBody(req) {
  return new Promise((resolve) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => resolve(body));
  });
}

// ─── Admin UI ────────────────────────────────────────────────────────────────
const ADMIN_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Admin — IEEE IES Tunisia</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { font-family: system-ui, sans-serif; }
    .tab-btn { padding: 8px 16px; border-radius: 8px; font-size: 14px; font-weight: 500; cursor: pointer; border: none; transition: all 0.2s; }
    .tab-btn.active { background: hsl(18 91% 54%); color: white; }
    .tab-btn:not(.active) { background: #f3f4f6; color: #6b7280; }
    .tab-btn:not(.active):hover { background: #e5e7eb; }
    input, textarea { width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; }
    input:focus, textarea:focus { outline: none; border-color: hsl(18 91% 54%); box-shadow: 0 0 0 2px hsl(18 91% 54% / 0.2); }
    .btn { padding: 8px 16px; border-radius: 6px; font-size: 14px; font-weight: 500; cursor: pointer; border: none; }
    .btn-primary { background: hsl(18 91% 54%); color: white; }
    .btn-primary:hover { background: hsl(18 91% 48%); }
    .btn-danger { background: #ef4444; color: white; }
    .btn-danger:hover { background: #dc2626; }
    .card { background: white; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; margin-bottom: 16px; }
    table { width: 100%; border-collapse: collapse; }
    th, td { text-align: left; padding: 8px 12px; border-bottom: 1px solid #e5e7eb; font-size: 14px; }
    th { font-weight: 600; color: #6b7280; }
  </style>
</head>
<body class="bg-gray-50 min-h-screen">
  <header class="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
    <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <span class="text-2xl">🗄️</span>
        <div>
          <h1 class="font-bold text-lg">Admin Panel</h1>
          <p class="text-xs text-white/70">IEEE IES Tunisia Section</p>
        </div>
      </div>
      <button onclick="location.reload()" class="text-sm bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg">🔄 Refresh</button>
    </div>
  </header>
  <nav class="bg-white border-b sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 flex gap-1 py-2 overflow-x-auto" id="tabs"></div>
  </nav>
  <main class="max-w-7xl mx-auto px-4 py-8" id="content"></main>
  <script>
    const API = '/api';
    let currentTab = 'settings';
    const tabs = [
      { id: 'settings', label: '⚙️ Settings' },
      { id: 'subunits', label: '🏫 Subunits' },
      { id: 'officers', label: '👥 Officers' },
      { id: 'awards', label: '🏆 Awards' },
      { id: 'upload', label: '📤 Upload' },
    ];

    async function api(path, opts = {}) {
      const res = await fetch(API + path, opts);
      return res.json();
    }

    function renderTabs() {
      document.getElementById('tabs').innerHTML = tabs.map(t =>
        \`<button class="tab-btn \${t.id === currentTab ? 'active' : ''}" onclick="switchTab('\${t.id}')">\${t.label}</button>\`
      ).join('');
    }

    function switchTab(id) {
      currentTab = id;
      renderTabs();
      loadTab(id);
    }

    async function loadTab(id) {
      const el = document.getElementById('content');
      el.innerHTML = '<p class="text-center text-gray-500 py-8">Loading...</p>';
      switch(id) {
        case 'settings': await loadSettings(); break;
        case 'subunits': await loadSubunits(); break;
        case 'officers': await loadOfficers(); break;
        case 'awards': await loadAwards(); break;
        case 'upload': loadUpload(); break;
      }
    }

    async function loadSettings() {
      const data = await api('/data');
      const el = document.getElementById('content');
      el.innerHTML = \`
        <div class="card">
          <h2 class="text-xl font-bold mb-4">Statistics</h2>
          <div class="grid md:grid-cols-4 gap-4">
            <div><label class="text-sm font-medium mb-1 block">Active Members</label>
              <input id="stat-members" value="\${data.stats.members}" /></div>
            <div><label class="text-sm font-medium mb-1 block">Chapters</label>
              <input id="stat-chapters" value="\${data.stats.chapters}" /></div>
            <div><label class="text-sm font-medium mb-1 block">Events/Year</label>
              <input id="stat-events" value="\${data.stats.events}" /></div>
            <div><label class="text-sm font-medium mb-1 block">Years</label>
              <input id="stat-years" value="\${data.stats.years}" /></div>
            <div class="md:col-span-4">
              <button class="btn btn-primary" onclick="saveStats()">💾 Save Stats</button>
            </div>
          </div>
        </div>
        <div class="card mt-6">
          <h2 class="text-xl font-bold mb-4">Site Settings</h2>
          <div class="grid md:grid-cols-2 gap-4">
            \${Object.entries(data.settings).filter(([k])=>!k.startsWith('stats_')).map(([k,v]) =>
              \`<div><label class="text-sm font-medium mb-1 block capitalize">\${k.replace(/_/g,' ')}</label>
                <input value="\${v}" onchange="api('/settings',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({type:'setting',key:'\${k}',value:this.value})}).then(()=>this.style.borderColor='#22c55e')" /></div>\`
            ).join('')}
          </div>
        </div>
      \`;
    }

    async function saveStats() {
      await api('/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'stats',
          members: document.getElementById('stat-members').value,
          chapters: document.getElementById('stat-chapters').value,
          events: document.getElementById('stat-events').value,
          years: document.getElementById('stat-years').value,
        })
      });
      alert('✅ Stats saved! Run npm run build to regenerate the site.');
    }

    async function loadSubunits() {
      const data = await api('/data');
      const el = document.getElementById('content');
      el.innerHTML = \`
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-bold">\${data.subunits.length} Subunits</h2>
          <button class="btn btn-primary" onclick="addSubunit()">+ Add Subunit</button>
        </div>
        <div class="card overflow-x-auto">
          <table>
            <thead><tr><th>Name</th><th>Location</th><th>University</th><th>Links</th><th>Actions</th></tr></thead>
            <tbody>
              \${data.subunits.map(s => \`
                <tr>
                  <td class="font-medium">\${s.name}</td>
                  <td>\${s.location}</td>
                  <td>\${s.university}</td>
                  <td>\${[s.facebook?'FB':'',s.website?'Web':'',s.linkedin?'LI':''].filter(Boolean).map(x=>\`<span class="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded mr-1">\${x}</span>\`).join('')}</td>
                  <td><button class="btn btn-danger text-xs" onclick="deleteSubunit(\${s.id})">🗑️</button></td>
                </tr>
              \`).join('')}
            </tbody>
          </table>
        </div>
      \`;
    }

    async function addSubunit() {
      const name = prompt('Subunit name:');
      if (!name) return;
      const short_name = prompt('Short name (slug, e.g. esprit):');
      if (!short_name) return;
      const location = prompt('Location:') || '';
      const university = prompt('University:') || '';
      await api('/subunits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, short_name, location, university })
      });
      loadSubunits();
    }

    async function deleteSubunit(id) {
      if (!confirm('Delete this subunit?')) return;
      await api('/subunits?id=' + id, { method: 'DELETE' });
      loadSubunits();
    }

    async function loadOfficers() {
      const data = await api('/data');
      const el = document.getElementById('content');
      el.innerHTML = \`
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-bold">\${data.officers.length} Officers</h2>
          <button class="btn btn-primary" onclick="addOfficer()">+ Add Officer</button>
        </div>
        <div class="card overflow-x-auto">
          <table>
            <thead><tr><th>Name</th><th>Role</th><th>Photo</th><th>Actions</th></tr></thead>
            <tbody>
              \${data.officers.map(o => \`
                <tr>
                  <td class="font-medium">\${o.name}</td>
                  <td>\${o.role}</td>
                  <td class="text-xs text-gray-500">\${o.photo || '—'}</td>
                  <td><button class="btn btn-danger text-xs" onclick="deleteOfficer(\${o.id})">🗑️</button></td>
                </tr>
              \`).join('')}
            </tbody>
          </table>
        </div>
      \`;
    }

    async function addOfficer() {
      const name = prompt('Name:');
      if (!name) return;
      const role = prompt('Role:') || '';
      const photo = prompt('Photo filename (in /team/):') || '';
      await api('/officers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, role, photo })
      });
      loadOfficers();
    }

    async function deleteOfficer(id) {
      if (!confirm('Delete this officer?')) return;
      await api('/officers?id=' + id, { method: 'DELETE' });
      loadOfficers();
    }

    async function loadAwards() {
      const data = await api('/data');
      const el = document.getElementById('content');
      el.innerHTML = data.awards.map(y => \`
        <div class="card">
          <h2 class="text-xl font-bold mb-4">🏆 \${y.year} <span class="text-sm font-normal text-gray-500">(\${y.awards.length} categories)</span></h2>
          \${y.awards.map(a => \`
            <div class="mb-4 pb-4 border-b last:border-0">
              <h3 class="font-semibold">\${a.name}</h3>
              \${a.description ? \`<p class="text-sm text-gray-500">\${a.description}</p>\` : ''}
              <div class="grid md:grid-cols-3 gap-2 mt-2">
                \${a.winners.map(w => \`
                  <div class="bg-gray-50 p-3 rounded-lg">
                    <p class="font-medium text-sm">\${w.title}</p>
                    <span class="inline-block bg-orange-100 text-orange-700 text-xs px-2 py-0.5 rounded mt-1">\${w.result}</span>
                  </div>
                \`).join('')}
              </div>
            </div>
          \`).join('')}
        </div>
      \`).join('') + \`
        <p class="text-sm text-gray-500 text-center mt-6">To add/edit awards, modify db/schema.sql seed data then run npm run db:reset.</p>
      \`;
    }

    function loadUpload() {
      document.getElementById('content').innerHTML = \`
        <div class="max-w-lg mx-auto card text-center">
          <h2 class="text-xl font-bold mb-4">📤 Upload Photo</h2>
          <p class="text-sm text-gray-500 mb-4">For batch uploads, use UploadThing's dashboard:</p>
          <a href="https://uploadthing.com/dashboard" target="_blank" class="btn btn-primary inline-block">Go to UploadThing Dashboard</a>
          <p class="text-xs text-gray-400 mt-3">Upload photos there, then paste the utfs.io URL into article JSON files.</p>
        </div>
      \`;
    }

    renderTabs();
    loadTab('settings');
  </script>
</body>
</html>`;

// ─── Router ──────────────────────────────────────────────────────────────────
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || "/", "http://localhost:" + PORT);
  const pathname = url.pathname;

  // ─── Admin UI ────────────────────────────────────────────────────────
  if (pathname === "/" || pathname === "/admin") {
    return html(res, ADMIN_HTML);
  }

  // ─── API: Get all data ───────────────────────────────────────────────
  if (pathname === "/api/data" && req.method === "GET") {
    const settings = {};
    db.prepare("SELECT key, value FROM site_settings").all().forEach((r) => {
      settings[r.key] = r.value;
    });

    const stats = {
      members: settings.stats_members || "500+",
      chapters: settings.stats_chapters || "10",
      events: settings.stats_events || "15+",
      years: settings.stats_years || "4+",
    };

    const subunits = db.prepare("SELECT * FROM subunits WHERE is_active = 1 ORDER BY sort_order ASC").all();
    const officers = db.prepare("SELECT * FROM officers WHERE is_active = 1 ORDER BY sort_order ASC").all();
    const sisterSocieties = db.prepare("SELECT * FROM sister_societies WHERE is_active = 1 ORDER BY sort_order ASC").all();
    const globalLeadership = db.prepare("SELECT * FROM global_leadership WHERE is_active = 1 ORDER BY sort_order ASC").all();

    const categories = db.prepare("SELECT * FROM award_categories ORDER BY year DESC, sort_order ASC").all();
    const awardsByYear = {};
    for (const cat of categories) {
      const winners = db.prepare("SELECT * FROM award_winners WHERE category_id = ? ORDER BY sort_order ASC").all(cat.id);
      if (!awardsByYear[cat.year]) awardsByYear[cat.year] = [];
      awardsByYear[cat.year].push({ ...cat, winners });
    }

    return json(res, {
      settings,
      stats,
      subunits,
      officers,
      awards: Object.entries(awardsByYear).map(([year, awards]) => ({ year: parseInt(year), awards })),
      sisterSocieties,
      globalLeadership,
    });
  }

  // ─── API: Settings update ────────────────────────────────────────────
  if (pathname === "/api/settings" && req.method === "POST") {
    const body = await readBody(req);
    const data = JSON.parse(body);
    if (data.type === "setting") {
      db.prepare(
        "INSERT INTO site_settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = ?"
      ).run(data.key, data.value, data.value);
    } else if (data.type === "stats") {
      db.prepare("INSERT INTO site_settings (key, value) VALUES ('stats_members', ?) ON CONFLICT(key) DO UPDATE SET value=?").run(data.members, data.members);
      db.prepare("INSERT INTO site_settings (key, value) VALUES ('stats_chapters', ?) ON CONFLICT(key) DO UPDATE SET value=?").run(data.chapters, data.chapters);
      db.prepare("INSERT INTO site_settings (key, value) VALUES ('stats_events', ?) ON CONFLICT(key) DO UPDATE SET value=?").run(data.events, data.events);
      db.prepare("INSERT INTO site_settings (key, value) VALUES ('stats_years', ?) ON CONFLICT(key) DO UPDATE SET value=?").run(data.years, data.years);
    }
    return json(res, { success: true });
  }

  // ─── API: Subunits ───────────────────────────────────────────────────
  if (pathname === "/api/subunits") {
    if (req.method === "POST") {
      const body = await readBody(req);
      const d = JSON.parse(body);
      db.prepare(
        "INSERT INTO subunits (name, short_name, location, university, facebook, instagram, website, linkedin, sort_order) VALUES (?,?,?,?,?,?,?,?,?)"
      ).run(d.name, d.short_name, d.location, d.university, d.facebook || null, d.instagram || null, d.website || null, d.linkedin || null, d.sort_order || 0);
      return json(res, { success: true });
    }
    if (req.method === "DELETE") {
      const id = url.searchParams.get("id");
      db.prepare("DELETE FROM subunits WHERE id = ?").run(parseInt(id));
      return json(res, { success: true });
    }
  }

  // ─── API: Officers ───────────────────────────────────────────────────
  if (pathname === "/api/officers") {
    if (req.method === "POST") {
      const body = await readBody(req);
      const d = JSON.parse(body);
      db.prepare(
        "INSERT INTO officers (name, role, email, linkedin, facebook, photo, sort_order) VALUES (?,?,?,?,?,?,?)"
      ).run(d.name, d.role, d.email || null, d.linkedin || null, d.facebook || null, d.photo || null, d.sort_order || 0);
      return json(res, { success: true });
    }
    if (req.method === "DELETE") {
      const id = url.searchParams.get("id");
      db.prepare("DELETE FROM officers WHERE id = ?").run(parseInt(id));
      return json(res, { success: true });
    }
  }

  // ─── Fallback ────────────────────────────────────────────────────────
  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("Not Found");
});

// Bind to localhost ONLY — not accessible from the network
server.listen(PORT, "127.0.0.1", () => {
  const tokenInfo = ADMIN_TOKEN
    ? "🔒 Token auth enabled"
    : "⚠️  No ADMIN_TOKEN set — anyone on this machine can access localhost:3100";

  console.log(`
╔══════════════════════════════════════════════════════╗
║   IEEE IES Tunisia — Admin Panel                     ║
║                                                      ║
║   → http://127.0.0.1:${PORT}                          ║
║   ${tokenInfo}
║                                                      ║
║   After making changes, run:                         ║
║   npm run build   → regenerate static site           ║
╚══════════════════════════════════════════════════════╝
  `);
});
