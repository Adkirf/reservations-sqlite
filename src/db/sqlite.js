const path = require("path");
const sqlite3 = require("sqlite3").verbose();

// !!!!!!! Maybe problem in prod mode : : absolute path
const dbPath = path.join(process.cwd(), "/src", "/db", "database.db");
// !!!!!!! Maybe problem in prod mode :: absolute path

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error connecting to SQLite database:", err.message);
  } else {
    console.log("Connected to SQLite database");
  }
});

module.exports = db;
