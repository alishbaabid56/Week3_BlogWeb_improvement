import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "blog.db");

const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    image TEXT,
    author TEXT NOT NULL,
    category TEXT NOT NULL,
    published INTEGER DEFAULT 1,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
  )
`);

export default db;