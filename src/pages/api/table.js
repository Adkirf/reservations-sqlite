// pages/api/tables.js

import db from "../../db/sqlite";

export default function handler(req, res) {
  if (req.method === "GET") {
    // Get all tables
    db.all("SELECT * FROM tables", (err, tables) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        res.status(200).json({ message: "tables retrieved", data: tables });
      }
    });
  } else if (req.method === "POST") {
    console.log("getting tables");

    // Create a new table
    const { seats, status } = req.body;
    db.run(
      "INSERT INTO tables (seats, status) VALUES (?, ?)",
      [seats, status],
      function (err) {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          res.status(201).json({ id: this.lastID, seats, status });
        }
      }
    );
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
