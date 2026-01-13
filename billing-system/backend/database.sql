CREATE DATABASE billing_db;
USE billing_db;

CREATE TABLE bills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    amount DECIMAL(10,2),
    tax DECIMAL(10,2),
    discount DECIMAL(10,2),
    total DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
