import React, { useState } from "react";

function PasswordStrength() {
  const [password, setPassword] = useState("");
  const [strengthMessage, setStrengthMessage] = useState("");

  const checkPasswordStrength = () => {
    if (password.length < 6) {
      setStrengthMessage("Weak password");
    } else if (/\d/.test(password)) {
      // Checks if the password contains at least one digit
      setStrengthMessage("Strong password");
    } else {
      // Password is 6 or more characters but has no number.
      // Based on the prompt's rules, it doesn't qualify as "Strong", so it's "Weak".
      setStrengthMessage("Weak password (consider adding a number)");
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
      <h2>Password Strength Checker</h2>
      <input
        type="password"
        placeholder="Enter password"
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
        onClick={checkPasswordStrength}
        style={{
          padding: "10px 15px",
          backgroundColor: "#1a73e8",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Check Strength
      </button>
      {strengthMessage && (
        <p
          style={{
            marginTop: "10px",
            fontWeight: "bold",
            color: strengthMessage.includes("Strong") ? "green" : "red",
          }}
        >
          {strengthMessage}
        </p>
      )}
    </div>
  );
}

export default PasswordStrength;
