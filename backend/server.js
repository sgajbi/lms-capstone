// Import the express module
const express = require("express");
// Create an Express application
const app = express();
// Define the port number to run the server on
const PORT = 5000;

// --- In-memory Data Stores (acting as a simple database for now) ---
// In a real application, these would be managed by a proper database (MySQL, MongoDB).
let users = [
  // Sample users (for conceptual existence checks)
  { id: 1, name: "Alice Johnson", email: "alice@example.com" },
  { id: 2, name: "Bob Smith", email: "bob@example.com" },
  { id: 3, name: "Charlie Lee", email: "charlie@example.com" },
];
let courses = [
  // Extended sample courses (for conceptual existence checks)
  {
    id: 1,
    name: "React for Beginners",
    description: "Master the fundamentals of React.js",
  },
  {
    id: 2,
    name: "Intro to Data Science",
    description: "Learn data analysis with Python and popular libraries.",
  },
  {
    id: 3,
    name: "AI Fundamentals",
    description: "Explore core concepts of Artificial Intelligence.",
  },
  {
    id: 4,
    name: "Advanced JavaScript",
    description: "Deep dive into modern JavaScript features.",
  },
  {
    id: 5,
    name: "Database Management with SQL",
    description: "Understand relational databases and SQL queries.",
  },
];
let enrollments = []; // Stores enrollments: { userId, courseId, enrollmentDate }

// --- Middleware ---
// 1. Middleware to parse JSON bodies in requests
app.use(express.json());

// --- Routes ---

// 2. Basic GET route for homepage
app.get("/", (req, res) => {
  res.send("Welcome to the LMS backend!");
});

// 3. GET route to return a sample list of courses
app.get("/courses", (req, res) => {
  res.json(courses); // Now uses the global 'courses' array
});

// --- NEW: POST /enroll → Enroll a user in a course ---
// Request body example: { "userId": 1, "courseId": 2 }
app.post("/enroll", (req, res) => {
  const { userId, courseId } = req.body;

  // Basic validation: Check for missing fields (Requirement)
  if (userId === undefined || courseId === undefined) {
    return res
      .status(400)
      .json({ message: "User ID and Course ID are required for enrollment." });
  }

  // Ensure userId and courseId are numbers
  const numericUserId = parseInt(userId);
  const numericCourseId = parseInt(courseId);

  if (isNaN(numericUserId) || isNaN(numericCourseId)) {
    return res
      .status(400)
      .json({ message: "User ID and Course ID must be valid numbers." });
  }

  // Conceptual existence checks for user and course
  const userExists = users.some((u) => u.id === numericUserId);
  const courseExists = courses.some((c) => c.id === numericCourseId);

  if (!userExists) {
    return res
      .status(404)
      .json({ message: `User with ID ${numericUserId} not found.` });
  }
  if (!courseExists) {
    return res
      .status(404)
      .json({ message: `Course with ID ${numericCourseId} not found.` });
  }

  // Check if already enrolled
  const alreadyEnrolled = enrollments.some(
    (enrollment) =>
      enrollment.userId === numericUserId &&
      enrollment.courseId === numericCourseId
  );

  if (alreadyEnrolled) {
    return res.status(409).json({
      message: `User ${numericUserId} is already enrolled in course ${numericCourseId}.`,
    });
  }

  // If all checks pass, proceed with enrollment
  const newEnrollment = {
    userId: numericUserId,
    courseId: numericCourseId,
    enrollmentDate: new Date().toISOString(),
  };

  enrollments.push(newEnrollment);

  console.log("New Enrollment:", newEnrollment);
  console.log("Current Enrollments:", enrollments); // For debugging purposes

  res
    .status(201)
    .json({ message: "Enrollment successful!", enrollment: newEnrollment });
});

// 4. Start the Express server and listen on PORT
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
