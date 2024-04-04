import fs from "fs";
import path from "path";
import db from "../../db/sqlite";
import axios from "axios";

export default function handler(req, res) {
  console.log("initi");
  // !!!!!!! Maybe problem in prod mode : absolute path
  const schemaPath = path.join(process.cwd(), "/src", "/db", "schema.sql");
  // !!!!!!! Maybe problem in prod mode : : absolute path

  const schema = fs.readFileSync(schemaPath, "utf8");

  db.exec(schema, (err) => {
    if (err) {
      console.error("Error initializing database:", err.message);
      res.status(500).json({ error: "Error initializing database" });
    } else {
      console.log("Database initialized successfully");
      res.status(200).json({ message: "Database initialized successfully" });
    }
  });

  const initPath = path.join(process.cwd(), "/src", "/db", "init.sql");

  db.get("SELECT COUNT(*) AS count FROM tables", (err, row) => {
    if (err) {
      console.error("Error checking tables list:", err.message);
      res.status(500).json({ error: "Error checking tables list" });
    } else {
      const tablesCount = row.count;

      if (tablesCount === 0) {
        const init = fs.readFileSync(initPath, "utf8");

        db.exec(init, (execErr) => {
          if (execErr) {
            console.error("Error initializing tables:", execErr.message);
            res.status(500).json({ error: "Error initializing tables" });
          } else {
            console.log("Default values inserted into tables successfully");
            res.status(200).json({
              message: "Default values inserted into tables successfully",
            });
          }
        });
      } else {
        console.log(
          "Tables list is not empty. Skipping default values insertion."
        );
        res.status(200).json({
          message:
            "Tables list is not empty. Skipping default values insertion.",
        });
      }
    }
  });
}
