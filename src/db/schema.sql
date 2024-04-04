-- Create tables table
CREATE TABLE IF NOT EXISTS tables (
    id INTEGER PRIMARY KEY,
    seats INTEGER
);

-- Create reservations table
CREATE TABLE IF NOT EXISTS reservations (
    id INTEGER PRIMARY KEY,
    table_id INTEGER,
    email TEXT,
    reservation_time DATETIME,
    FOREIGN KEY (table_id) REFERENCES tables(id)
);

-- Create table_reservations table to store the relationship between tables and reservations
CREATE TABLE IF NOT EXISTS table_reservations (
    table_id INTEGER,
    reservation_id INTEGER,
    FOREIGN KEY (table_id) REFERENCES tables(id),
    FOREIGN KEY (reservation_id) REFERENCES reservations(id),
    PRIMARY KEY (table_id, reservation_id)
);
