CREATE DATABASE IF NOT EXISTS user_system;

USE user_system;

CREATE TABLE
  user (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password_ciphertext VARCHAR(64) NOT NULL,
    salt VARCHAR(16) NOT NULL
  );