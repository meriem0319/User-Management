DROP DATABASE IF EXISTS userManagement_db;

CREATE DATABASE userManagement_db;

USE userManagement_db;

CREATE TABLE user ( 
    id INT NOT NULL AUTO_INCREMENT, 
    first_name VARCHAR(45) NOT NULL,
    last_name VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL, 
    phone VARCHAR(45) NOT NULL, 
    comments TEXT NOT NULL, 
    status VARCHAR(10) NOT NULL DEFAULT 'active',
    PRIMARY KEY (id)) 
    -- ENGINE = InnoDB;