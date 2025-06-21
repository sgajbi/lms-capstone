import React, { useState } from "react";

// Login Component
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      setMessage("Please fill in all fields.");
    } else if (!email.includes("@")) {
      setMessage("Invalid email format.");
    } else {
      setMessage("Login successful!");
      // You can add API call or redirection here
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        marginBottom: "20px",
      }}
    >
      <h2>Login to LMS</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            marginBottom: "10px",
            display: "block",
            padding: "8px",
            width: "100%",
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            marginBottom: "10px",
            display: "block",
            padding: "8px",
            width: "100%",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 15px",
            backgroundColor: "#1a73e8",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>
      {message && (
        <p
          style={{
            marginTop: "10px",
            color: message.includes("successful") ? "green" : "red",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}

// Course Recommender Component
function CourseRecommender() {
  const [interest, setInterest] = useState("");
  const [recommended, setRecommended] = useState("");

  const recommendCourse = () => {
    if (interest.toLowerCase().includes("web")) {
      setRecommended("We recommend: React.js for Beginners");
    } else if (interest.toLowerCase().includes("data")) {
      setRecommended("We recommend: Intro to Data Science with Python");
    } else if (interest.toLowerCase().includes("ai")) {
      setRecommended("We recommend: Machine Learning with Scikit-Learn");
    } else {
      setRecommended("Please enter a valid interest (e.g., AI, Web, Data)");
    }
  };

  return (
    <div
      style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}
    >
      <h2>AI Course Recommender</h2>
      <input
        type="text"
        placeholder="Enter your interest (e.g., AI, Web, Data)"
        value={interest}
        onChange={(e) => setInterest(e.target.value)}
        style={{
          marginBottom: "10px",
          display: "block",
          padding: "8px",
          width: "100%",
        }}
      />
      <button
        onClick={recommendCourse}
        style={{
          padding: "10px 15px",
          backgroundColor: "#1a73e8",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Get Recommendation
      </button>
      {recommended && (
        <p style={{ marginTop: "10px", fontWeight: "bold" }}>{recommended}</p>
      )}
    </div>
  );
}

// Export both components
export { Login, CourseRecommender };
