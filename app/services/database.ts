import * as SQLite from "expo-sqlite";

// Membuka atau membuat database
export const db = SQLite.openDatabaseSync("financefy.db");

export const initDatabase = async () => {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT NOT NULL,           -- expense, income, debt
      amount REAL NOT NULL,
      wallet_name TEXT,
      wallet_icon TEXT,
      category_name TEXT,
      category_icon TEXT,
      note TEXT,
      date TEXT NOT NULL,           -- Simpan sebagai ISO string
      exclude_from_report INTEGER   -- 0 untuk false, 1 untuk true
    );
  `);
  console.log("Database Initialized");
};
