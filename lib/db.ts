/**
 * IEEE IES Tunisia — Database Layer
 * ===================================
 * SQLite database access via better-sqlite3.
 * All data access goes through this module.
 *
 * The database file lives at `<project>/db/ies-tunisia.db`.
 * It is created automatically on first access from `db/schema.sql`.
 *
 * ⚠️  This module is only used at **build time** (SSG). The produced
 *      HTML is fully static — no runtime DB connection needed.
 */

import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

const DB_DIR = path.join(process.cwd(), "db");
const DB_PATH = path.join(DB_DIR, "ies-tunisia.db");
const SCHEMA_PATH = path.join(DB_DIR, "schema.sql");

// ─── Singleton ──────────────────────────────────────────────────────────────
let _db: Database.Database | null = null;

/**
 * Get (or create) the SQLite database connection.
 * Creates the DB file and runs schema.sql on first access.
 */
export function getDb(): Database.Database {
  if (_db) return _db;

  // Ensure db directory exists
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }

  const firstRun = !fs.existsSync(DB_PATH);
  _db = new Database(DB_PATH);

  // WAL mode for better concurrent read performance
  _db.pragma("journal_mode = WAL");
  _db.pragma("foreign_keys = ON");

  if (firstRun && fs.existsSync(SCHEMA_PATH)) {
    const schema = fs.readFileSync(SCHEMA_PATH, "utf-8");
    _db.exec(schema);
  }

  return _db;
}

// ─── Types ──────────────────────────────────────────────────────────────────

export interface SiteSettings {
  [key: string]: string;
}

export interface Subunit {
  id: number;
  name: string;
  short_name: string;
  location: string;
  university: string;
  facebook: string | null;
  instagram: string | null;
  website: string | null;
  linkedin: string | null;
  is_active: number;
  sort_order: number;
}

export interface Officer {
  id: number;
  name: string;
  role: string;
  email: string | null;
  linkedin: string | null;
  facebook: string | null;
  photo: string | null;
  sort_order: number;
  is_active: number;
}

export interface AwardCategory {
  id: number;
  year: number;
  name: string;
  description: string | null;
  award_type: string;
  date: string | null;
  sort_order: number;
}

export interface AwardWinner {
  id: number;
  category_id: number;
  title: string;
  result: string;
  winner_logo_url: string | null;
  sort_order: number;
}

export interface AwardWithWinners extends AwardCategory {
  winners: AwardWinner[];
}

export interface AwardsByYear {
  year: number;
  awards: AwardWithWinners[];
}

export interface SisterSociety {
  id: number;
  name: string;
  short_name: string;
  url: string;
  sort_order: number;
}

export interface GlobalLeader {
  id: number;
  name: string;
  role: string;
  note: string | null;
  sort_order: number;
}

// ─── Query Functions ────────────────────────────────────────────────────────

export function getSiteSettings(): SiteSettings {
  const db = getDb();
  const rows = db.prepare("SELECT key, value FROM site_settings").all() as { key: string; value: string }[];
  const settings: SiteSettings = {};
  rows.forEach((r) => (settings[r.key] = r.value));
  return settings;
}

export function getSetting(key: string): string | undefined {
  const db = getDb();
  const row = db.prepare("SELECT value FROM site_settings WHERE key = ?").get(key) as { value: string } | undefined;
  return row?.value;
}

export function updateSetting(key: string, value: string): void {
  const db = getDb();
  db.prepare(
    "INSERT INTO site_settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = ?, updated_at = datetime('now')"
  ).run(key, value, value);
}

export function getAllSubunits(): Subunit[] {
  const db = getDb();
  return db
    .prepare("SELECT * FROM subunits WHERE is_active = 1 ORDER BY sort_order ASC")
    .all() as Subunit[];
}

export function getSubunitByShortName(shortName: string): Subunit | undefined {
  const db = getDb();
  return db
    .prepare("SELECT * FROM subunits WHERE short_name = ?")
    .get(shortName) as Subunit | undefined;
}

export function getAllOfficers(): Officer[] {
  const db = getDb();
  return db
    .prepare("SELECT * FROM officers WHERE is_active = 1 ORDER BY sort_order ASC")
    .all() as Officer[];
}

export function getAllAwardsByYear(): AwardsByYear[] {
  const db = getDb();
  const categories = db
    .prepare("SELECT * FROM award_categories ORDER BY year DESC, sort_order ASC")
    .all() as AwardCategory[];

  const winnersStmt = db.prepare(
    "SELECT * FROM award_winners WHERE category_id = ? ORDER BY sort_order ASC"
  );

  const byYear = new Map<number, AwardWithWinners[]>();
  for (const cat of categories) {
    const winners = winnersStmt.all(cat.id) as AwardWinner[];
    if (!byYear.has(cat.year)) byYear.set(cat.year, []);
    byYear.get(cat.year)!.push({ ...cat, winners });
  }

  return Array.from(byYear.entries())
    .map(([year, awards]) => ({ year, awards }))
    .sort((a, b) => b.year - a.year);
}

export function getSisterSocieties(): SisterSociety[] {
  const db = getDb();
  return db
    .prepare("SELECT * FROM sister_societies WHERE is_active = 1 ORDER BY sort_order ASC")
    .all() as SisterSociety[];
}

export function getGlobalLeadership(): GlobalLeader[] {
  const db = getDb();
  return db
    .prepare("SELECT * FROM global_leadership WHERE is_active = 1 ORDER BY sort_order ASC")
    .all() as GlobalLeader[];
}

export function getStats(): { members: string; chapters: string; events: string; years: string } {
  const settings = getSiteSettings();
  return {
    members: settings.stats_members || "500+",
    chapters: settings.stats_chapters || "10",
    events: settings.stats_events || "15+",
    years: settings.stats_years || "4+",
  };
}

// ─── Admin / Write Functions ────────────────────────────────────────────────

export function upsertSubunit(data: {
  id?: number;
  name: string;
  short_name: string;
  location: string;
  university: string;
  facebook?: string | null;
  instagram?: string | null;
  website?: string | null;
  linkedin?: string | null;
  sort_order?: number;
}): void {
  const db = getDb();
  if (data.id) {
    db.prepare(
      `UPDATE subunits SET name=?, short_name=?, location=?, university=?, facebook=?, instagram=?, website=?, linkedin=?, sort_order=?, updated_at=datetime('now') WHERE id=?`
    ).run(data.name, data.short_name, data.location, data.university, data.facebook ?? null, data.instagram ?? null, data.website ?? null, data.linkedin ?? null, data.sort_order ?? 0, data.id);
  } else {
    db.prepare(
      `INSERT INTO subunits (name, short_name, location, university, facebook, instagram, website, linkedin, sort_order) VALUES (?,?,?,?,?,?,?,?,?)`
    ).run(data.name, data.short_name, data.location, data.university, data.facebook ?? null, data.instagram ?? null, data.website ?? null, data.linkedin ?? null, data.sort_order ?? 0);
  }
}

export function deleteSubunit(id: number): void {
  const db = getDb();
  db.prepare("DELETE FROM subunits WHERE id = ?").run(id);
}

export function upsertOfficer(data: {
  id?: number;
  name: string;
  role: string;
  email?: string | null;
  linkedin?: string | null;
  facebook?: string | null;
  photo?: string | null;
  sort_order?: number;
}): void {
  const db = getDb();
  if (data.id) {
    db.prepare(
      `UPDATE officers SET name=?, role=?, email=?, linkedin=?, facebook=?, photo=?, sort_order=?, updated_at=datetime('now') WHERE id=?`
    ).run(data.name, data.role, data.email ?? null, data.linkedin ?? null, data.facebook ?? null, data.photo ?? null, data.sort_order ?? 0, data.id);
  } else {
    db.prepare(
      `INSERT INTO officers (name, role, email, linkedin, facebook, photo, sort_order) VALUES (?,?,?,?,?,?,?)`
    ).run(data.name, data.role, data.email ?? null, data.linkedin ?? null, data.facebook ?? null, data.photo ?? null, data.sort_order ?? 0);
  }
}

export function deleteOfficer(id: number): void {
  const db = getDb();
  db.prepare("DELETE FROM officers WHERE id = ?").run(id);
}

export function upsertAwardCategory(data: {
  id?: number;
  year: number;
  name: string;
  description?: string | null;
  award_type?: string;
  date?: string | null;
  sort_order?: number;
}): number {
  const db = getDb();
  if (data.id) {
    db.prepare(
      `UPDATE award_categories SET year=?, name=?, description=?, award_type=?, date=?, sort_order=? WHERE id=?`
    ).run(data.year, data.name, data.description ?? null, data.award_type ?? "standard", data.date ?? null, data.sort_order ?? 0, data.id);
    return data.id;
  } else {
    const result = db.prepare(
      `INSERT INTO award_categories (year, name, description, award_type, date, sort_order) VALUES (?,?,?,?,?,?)`
    ).run(data.year, data.name, data.description ?? null, data.award_type ?? "standard", data.date ?? null, data.sort_order ?? 0);
    return result.lastInsertRowid as number;
  }
}

export function deleteAwardCategory(id: number): void {
  const db = getDb();
  db.prepare("DELETE FROM award_categories WHERE id = ?").run(id);
}

export function upsertAwardWinner(data: {
  id?: number;
  category_id: number;
  title: string;
  result: string;
  winner_logo_url?: string | null;
  sort_order?: number;
}): void {
  const db = getDb();
  if (data.id) {
    db.prepare(
      `UPDATE award_winners SET category_id=?, title=?, result=?, winner_logo_url=?, sort_order=? WHERE id=?`
    ).run(data.category_id, data.title, data.result, data.winner_logo_url ?? null, data.sort_order ?? 0, data.id);
  } else {
    db.prepare(
      `INSERT INTO award_winners (category_id, title, result, winner_logo_url, sort_order) VALUES (?,?,?,?,?)`
    ).run(data.category_id, data.title, data.result, data.winner_logo_url ?? null, data.sort_order ?? 0);
  }
}

export function deleteAwardWinner(id: number): void {
  const db = getDb();
  db.prepare("DELETE FROM award_winners WHERE id = ?").run(id);
}

export function updateStats(members: string, chapters: string, events: string, years: string): void {
  const db = getDb();
  db.prepare("INSERT INTO site_settings (key, value) VALUES ('stats_members', ?) ON CONFLICT(key) DO UPDATE SET value=?").run(members, members);
  db.prepare("INSERT INTO site_settings (key, value) VALUES ('stats_chapters', ?) ON CONFLICT(key) DO UPDATE SET value=?").run(chapters, chapters);
  db.prepare("INSERT INTO site_settings (key, value) VALUES ('stats_events', ?) ON CONFLICT(key) DO UPDATE SET value=?").run(events, events);
  db.prepare("INSERT INTO site_settings (key, value) VALUES ('stats_years', ?) ON CONFLICT(key) DO UPDATE SET value=?").run(years, years);
}
