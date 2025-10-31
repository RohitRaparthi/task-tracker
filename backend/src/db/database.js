const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_FILE = path.join(__dirname, '..', '..', 'task_tracker.db');

function openDb() {
  const db = new sqlite3.Database(DB_FILE, (err) => {
    if (err) console.error('Failed to connect to DB:', err.message);
  });

  db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      priority TEXT CHECK(priority IN ('Low','Medium','High')) DEFAULT 'Medium',
      due_date TEXT NOT NULL,
      status TEXT CHECK(status IN ('Open','In Progress','Done')) DEFAULT 'Open',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  return db;
}

module.exports = { openDb };
