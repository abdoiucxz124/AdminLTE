import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, 'dashboard.sqlite');

export async function openDb() {
  return open({
    filename: dbPath,
    driver: sqlite3.Database,
  });
}

export async function init() {
  const db = await openDb();
  await db.exec(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    role TEXT
  )`);
  await db.exec(`CREATE TABLE IF NOT EXISTS sites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    url TEXT UNIQUE,
    username TEXT,
    password TEXT,
    google_ad_manager_credentials TEXT
  )`);
}
