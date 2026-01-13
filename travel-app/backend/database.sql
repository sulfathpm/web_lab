CREATE DATABASE trip_db;
USE trip_db;

CREATE TABLE trip_details(
    trip_id INT AUTO_INCREMENT PRIMARY KEY,
    pickup VARCHAR(100),
    destination VARCHAR(100),
    distance DECIMAL(10,2),
    vehicle VARCHAR(50),
    hourss DECIMAL(10,2),
    base_fare DECIMAL(10,2),
    tax DECIMAL(10,2),
    total_amount DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);