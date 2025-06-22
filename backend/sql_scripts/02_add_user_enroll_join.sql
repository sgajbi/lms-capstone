USE lms_db;

-- Create the users table
CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the courses table
CREATE TABLE IF NOT EXISTS courses (
    course_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT
);

-- Insert some sample courses
INSERT IGNORE INTO courses (course_id, title, description) VALUES
(101, 'Introduction to SQL', 'Learn the basics of relational databases and SQL.'),
(102, 'Advanced Python Programming', 'Dive deep into Python concepts.'),
(103, 'Web Development Fundamentals', 'HTML, CSS, JavaScript basics.');

-- Create the enrollments table:
CREATE TABLE IF NOT EXISTS enrollments (
    enrollment_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    course_id INT NOT NULL,
    enrollment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (course_id) REFERENCES courses(course_id),
    UNIQUE (user_id, course_id) 
);

-- Add new users:
INSERT INTO users (username, email) VALUES
('learner_max', 'max.learner@example.com');

-- Enroll the new user in a course:

INSERT INTO enrollments (user_id, course_id) VALUES
( (SELECT user_id FROM users WHERE username = 'learner_max'), 101);

-- Execute the JOIN query to show enrolled user details:

SELECT 
    u.user_id,
    u.username,
    u.email,
    e.enrollment_date,
    c.title AS course_title,
    c.description AS course_description
FROM
    users u
        JOIN
    enrollments e ON u.user_id = e.user_id
        JOIN
    courses c ON e.course_id = c.course_id
WHERE
    u.username = 'learner_max'; 