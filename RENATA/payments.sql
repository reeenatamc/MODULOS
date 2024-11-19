CREATE DATABASE payments_db;

USE payments_db;

CREATE TABLE payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    payer_name VARCHAR(100) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    payment_date DATE NOT NULL
);
