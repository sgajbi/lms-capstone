-- Select the database 
CREATE DATABASE IF NOT EXISTS lms_db;
USE lms_db;

-- Create the instructors table
CREATE TABLE instructors (
    instructor_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
);

-- Insert sample records into the instructors table
INSERT INTO instructors (name, email) VALUES
('Dr. Emily White', 'emily.white@lms.com'),
('Prof. John Davis', 'john.davis@lms.com'),
('Ms. Sarah Green', 'sarah.green@lms.com');

-- Verify the insertions 
SELECT * FROM instructors;