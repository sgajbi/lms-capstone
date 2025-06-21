import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Placeholder imports for pages (currently not used in the render for this step)
import Home from "./pages/Home";
import Login from "./pages/Login"; // This Login is for the router, not the sample component
import Courses from "./pages/Courses";
import Chatbot from "./pages/Chatbot";

// Import the newly created components
import PasswordStrength from "./components/PasswordStrength";
import CourseToggle from "./components/CourseToggle";

// Import the sample components
import {
  Login as SampleLogin,
  CourseRecommender,
} from "./components/LMSComponents"; // Renamed Login to SampleLogin to avoid conflict with ./pages/Login

function App() {
  return (
    <Router>
      <div
        style={{
          padding: "20px",
          maxWidth: "800px",
          margin: "20px auto",
          border: "1px solid #eee",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#1a73e8",
            marginBottom: "30px",
          }}
        >
          AI LMS React Components
        </h1>

        {/* Render the Login component */}
        <SampleLogin />
        <hr style={{ margin: "30px 0", borderColor: "#eee" }} />

        {/* Render the Course Recommender component */}
        <CourseRecommender />
        <hr style={{ margin: "30px 0", borderColor: "#eee" }} />

        {/* Render the Password Strength Checker component */}
        <PasswordStrength />
        <hr style={{ margin: "30px 0", borderColor: "#eee" }} />

        {/* Render the Course Description Toggle component */}
        <CourseToggle />

        {/* Original Routes - These routes currently render empty elements as per initial setup.
            For this capstone, demonstrating the components directly is the primary goal.
        */}
        <Routes>
          {/* These routes are here as per the original starter code, but currently render null or placeholders.
              In a full application, you would replace `element={null}` with actual page components.
          */}
          <Route path="/" element={null} />
          <Route path="/login" element={null} />
          <Route path="/courses" element={null} />
          <Route path="/chatbot" element={null} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
