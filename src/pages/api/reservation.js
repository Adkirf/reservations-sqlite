import db from "../../db/sqlite";

export default function handler(req, res) {
  if (req.method === "GET") {
    const { selectedDate, selectedAmount } = req.query;

    // Check if parameters are empty
    if (!selectedDate || !selectedAmount) {
      // If parameters are empty, return all reservations
      db.all(
        "SELECT r.*, tr.table_id FROM reservations r INNER JOIN table_reservations tr ON r.id = tr.reservation_id",
        (err, reservations) => {
          if (err) {
            res.status(500).json({ error: err.message });
          } else {
            res
              .status(200)
              .json({ message: "Reservations retrieved", data: reservations });
          }
        }
      );
    } else {
      // Query the database to find available tables for the selected date and amount
      db.all(
        `SELECT t.id 
         FROM tables t
         WHERE t.id NOT IN (
           SELECT tr.table_id 
           FROM table_reservations tr
           JOIN reservations r ON tr.reservation_id = r.id
           WHERE strftime('%Y-%m-%d', r.reservation_time) = ?
         )
         AND t.seats >= ?`,
        [selectedDate, selectedAmount],
        (err, availableTables) => {
          if (err) {
            res.status(500).json({ error: err.message });
          } else {
            // Extract table IDs from the result
            const tableIds = availableTables.map((table) => table.id);
            res.status(200).json({ availableTables: tableIds });
          }
        }
      );
    }
  } else if (req.method === "POST") {
    // Extract data from the request body
    const { tables, email, reservationTime } = req.body;

    // Insert reservation into the database
    const insertReservation = () => {
      return new Promise((resolve, reject) => {
        db.run(
          "INSERT INTO reservations (email, reservation_time) VALUES (?, ?)",
          [email, reservationTime],
          function (err) {
            if (err) {
              reject(err);
            } else {
              resolve(this.lastID);
            }
          }
        );
      });
    };

    // Insert table reservations into the database
    const insertTableReservations = (reservationId) => {
      return new Promise((resolve, reject) => {
        const values = tables
          .map((tableId) => `(${tableId}, ${reservationId})`)
          .join(",");
        db.run(
          `INSERT INTO table_reservations (table_id, reservation_id) VALUES ${values}`,
          function (err) {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          }
        );
      });
    };

    // Execute the insertion functions
    insertReservation()
      .then((reservationId) => insertTableReservations(reservationId))
      .then(() => {
        res.status(201).json({ message: "Reservation submitted successfully" });
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
