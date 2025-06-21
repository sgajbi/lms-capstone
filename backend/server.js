// Import the express module
const express = require("express");
// Create an Express application
const app = express();
// Define the port number to run the server on
const PORT = 5000;

// --- In-memory Data Stores (acting as a simple database for now) ---
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
let enrollments = [
  // Seed some initial enrollments for testing
  { userId: 1, courseId: 1, enrollmentDate: "2024-01-10T10:00:00.000Z" },
  { userId: 1, courseId: 3, enrollmentDate: "2024-02-05T12:30:00.000Z" },
  { userId: 2, courseId: 2, enrollmentDate: "2024-02-15T09:15:00.000Z" },
];
// NEW: In-memory store for user progress { userId: { courseId: { quizzes: [], timeSpent: 0, completedModules: [] } } }
let userProgress = {
  1: {
    // Alice's progress
    1: {
      quizzes: [{ score: 85, date: "2024-03-01" }],
      timeSpent: 120,
      completedModules: ["Intro", "Components"],
    },
    3: {
      quizzes: [{ score: 70, date: "2024-03-10" }],
      timeSpent: 60,
      completedModules: ["AI Concepts"],
    },
  },
  2: {
    // Bob's progress
    2: {
      quizzes: [{ score: 92, date: "2024-03-05" }],
      timeSpent: 180,
      completedModules: ["Data Types", "Pandas Intro"],
    },
  },
};

// --- Middleware ---
app.use(express.json());

// --- Routes ---

app.get("/", (req, res) => {
  res.send("Welcome to the LMS backend!");
});

app.get("/courses", (req, res) => {
  res.json(courses);
});

app.post("/enroll", (req, res) => {
  const { userId, courseId } = req.body;

  if (userId === undefined || courseId === undefined) {
    return res
      .status(400)
      .json({ message: "User ID and Course ID are required for enrollment." });
  }

  const numericUserId = parseInt(userId);
  const numericCourseId = parseInt(courseId);

  if (isNaN(numericUserId) || isNaN(numericCourseId)) {
    return res
      .status(400)
      .json({ message: "User ID and Course ID must be valid numbers." });
  }

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

  const newEnrollment = {
    userId: numericUserId,
    courseId: numericCourseId,
    enrollmentDate: new Date().toISOString(),
  };

  enrollments.push(newEnrollment);

  // Initialize user progress for this course if it doesn't exist
  if (!userProgress[numericUserId]) {
    userProgress[numericUserId] = {};
  }
  if (!userProgress[numericUserId][numericCourseId]) {
    userProgress[numericUserId][numericCourseId] = {
      quizzes: [],
      timeSpent: 0,
      completedModules: [],
    };
  }

  console.log("New Enrollment:", newEnrollment);
  console.log("Current Enrollments:", enrollments);

  res
    .status(201)
    .json({ message: "Enrollment successful!", enrollment: newEnrollment });
});

// --- NEW: GET /user/:userId/courses → View user progress ---
app.get("/user/:userId/courses", (req, res) => {
  const userId = parseInt(req.params.userId); // Get userId from URL parameter

  if (isNaN(userId)) {
    return res.status(400).json({ message: "Invalid User ID provided." });
  }

  // Find all enrollments for the given userId
  const userEnrollments = enrollments.filter(
    (enrollment) => enrollment.userId === userId
  );

  if (userEnrollments.length === 0) {
    // Return 200 OK with an empty array or a specific message if no enrollments
    return res.status(200).json([]); // Or { message: `User ${userId} has no enrollments.` }
  }

  // Combine enrollment info with detailed progress for each course
  const coursesWithProgress = userEnrollments.map((enrollment) => {
    // Find the course details from the global 'courses' array
    const courseDetail = courses.find((c) => c.id === enrollment.courseId);

    // Get progress for this specific course. Use a default empty object if no progress is recorded.
    const progress = userProgress[userId]
      ? userProgress[userId][enrollment.courseId]
      : {};

    return {
      course: courseDetail || {
        id: enrollment.courseId,
        name: "Unknown Course",
      }, // Provide a fallback if course not found
      enrollmentDate: enrollment.enrollmentDate,
      progress: progress || { quizzes: [], timeSpent: 0, completedModules: [] }, // Ensure progress is an object
    };
  });

  res.status(200).json(coursesWithProgress);
});

// 4. Start the Express server and listen on PORT
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
