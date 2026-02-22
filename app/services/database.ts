import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabaseSync("financefy.db");

export const initDatabase = async () => {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    
    CREATE TABLE IF NOT EXISTS wallets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      icon TEXT NOT NULL,
      balance REAL DEFAULT 0,
      type TEXT NOT NULL -- 'bank' atau 'cash'
    );
    
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

    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      icon TEXT NOT NULL,
      type TEXT NOT NULL -- 'income' atau 'expense'
    );
  `);

  const count: any = await db.getFirstAsync("SELECT COUNT(*) as total FROM categories");
  if (count.total === 0) {
    await db.execAsync(`
      INSERT INTO categories (name, icon, type) VALUES 
      ('Makanan', '🍔', 'expense'),
      ('Transport', '🚗', 'expense'),
      ('Gaji', '💰', 'income'),
      ('Investasi', '📈', 'income');
    `);
  }
  console.log("Database Initialized");
};
