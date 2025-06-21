import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Placeholder imports for pages, these files will be created later if needed.
// For now, they might not exist, which is fine for setup.
import Home from "./pages/Home";
import Login from "./pages/Login";
import Courses from "./pages/Courses";
import Chatbot from "./pages/Chatbot";

function App() {
  return (
    <Router>
      <Routes>
        {/* These elements are intentionally empty as per your starter code */}
        <Route path="/" element={null} />
        <Route path="/login" element={null} />
        <Route path="/courses" element={null} />
        <Route path="/chatbot" element={null} />
      </Routes>
    </Router>
  );
}
export default App;
