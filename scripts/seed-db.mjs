#!/usr/bin/env node
/**
 * IEEE IES Tunisia — Database Seed Script
 * =========================================
 * Creates (or recreates) the SQLite database from db/schema.sql.
 *
 * Usage:
 *   npm run db:seed        → Create DB if it doesn't exist
 *   npm run db:reset       → Delete and recreate DB (loses all changes!)
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, "..");
const DB_DIR = path.join(ROOT, "db");
const DB_PATH = path.join(DB_DIR, "ies-tunisia.db");
const SCHEMA_PATH = path.join(DB_DIR, "schema.sql");

const mode = process.argv[2] === "--reset" ? "reset" : "seed";

if (mode === "reset") {
  if (fs.existsSync(DB_PATH)) {
    console.log("🗑️  Deleting existing database:", DB_PATH);
    fs.unlinkSync(DB_PATH);
  }
  // Also delete WAL/SHM files if they exist
  if (fs.existsSync(DB_PATH + "-wal")) fs.unlinkSync(DB_PATH + "-wal");
  if (fs.existsSync(DB_PATH + "-shm")) fs.unlinkSync(DB_PATH + "-shm");
}

if (!fs.existsSync(SCHEMA_PATH)) {
  console.error("❌ schema.sql not found at:", SCHEMA_PATH);
  process.exit(1);
}

// Ensure db directory exists
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

import Database from "better-sqlite3";

console.log("📦 Creating database at:", DB_PATH);
const db = new Database(DB_PATH);
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

const schema = fs.readFileSync(SCHEMA_PATH, "utf-8");
db.exec(schema);

console.log("✅ Database seeded successfully!");
console.log("");
console.log("Next steps:");
console.log("  1. Run admin panel:  npm run admin");
console.log("  2. Make your changes in the admin UI");
console.log("  3. Build static site: npm run build");
console.log("");
console.log("To reset the database: npm run db:reset");

db.close();
