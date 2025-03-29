import sqlite3 from "sqlite3";
import path from "path";

// Define the SQLite database file path
const dbPath = path.resolve(__dirname, "../database.sqlite");

// Open or create the database file
export const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to SQLite database.");
  }
});
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS sales_table (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_name TEXT,
    category TEXT,
    quantity INTEGER,
    revenue DECIMAL(10,2),
    sale_date DATE
  )`);

  db.get("SELECT COUNT(*) AS count FROM sales_table", (err, row: any) => {
    if (err) {
      console.error("Error checking sales_table:", err.message);
      return;
    }

    if (row.count === 0) {
      const insertStmt = db.prepare(`
        INSERT INTO sales_table (product_name, category, quantity, revenue, sale_date) 
        VALUES (?, ?, ?, ?, ?)
      `);

      const sampleData = [
        ["Laptop", "Electronics", 50, 75000.0, "2024-03-01"],
        ["Smartphone", "Electronics", 100, 120000.0, "2024-03-15"],
        ["Tablet", "Electronics", 30, 45000.0, "2024-02-20"],
        ["Headphones", "Accessories", 75, 22500.0, "2024-03-10"],
      ];

      sampleData.forEach((row) => insertStmt.run(row));
      insertStmt.finalize();
      console.log("Sample data inserted.");
    }
  });
});

export default db;
