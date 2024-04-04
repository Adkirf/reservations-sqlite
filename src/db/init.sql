-- Insert default values into the tables table
INSERT INTO tables (seats) VALUES
    (4),
    (4),
    (6),
    (2);

-- Insert default reservations
INSERT INTO reservations (table_id, email, reservation_time) VALUES
    (1, 'example1@example.com', '2024-04-03 10:00:00'),
    (2, 'example2@example.com', '2024-04-04 11:00:00'),
    (3, 'example3@example.com', '2024-04-05 12:00:00'),
    (4, 'example4@example.com', '2024-04-06 13:00:00');

-- Insert corresponding table_reservations
INSERT INTO table_reservations (table_id, reservation_id) VALUES
    (1, 1),
    (1, 2),
    (3, 3),
    (4, 4);
