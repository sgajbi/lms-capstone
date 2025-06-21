import React, { useState } from "react";

function CourseToggle() {
  const [isVisible, setIsVisible] = useState(false); // State to control visibility

  const toggleDescription = () => {
    setIsVisible(!isVisible); // Toggles the boolean value of isVisible
  };

  return (
    <div
      style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}
    >
      <h2>Course Description Toggle</h2>
      <button
        onClick={toggleDescription}
        style={{
          padding: "10px 15px",
          backgroundColor: "#1a73e8",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "10px",
        }}
      >
        {isVisible ? "Hide Description" : "Show Description"}{" "}
        {/* Button text changes based on state */}
      </button>
      {isVisible && ( // Conditionally render the paragraph based on isVisible state
        <p style={{ lineHeight: "1.6" }}>
          This course covers React fundamentals including components, JSX, and
          props. You will learn to build interactive user interfaces and manage
          application state efficiently.
        </p>
      )}
    </div>
  );
}

export default CourseToggle;
