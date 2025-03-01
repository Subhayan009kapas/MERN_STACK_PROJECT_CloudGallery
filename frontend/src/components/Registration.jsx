import axios from "axios";
import React, { useState } from "react";
import './Registration.css'; // Ensure this file contains the same styles as Login.css
import { useNavigate } from "react-router-dom";

function Registration() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/auth/register", { username, password });
      setUsername("");
      setPassword("");
      setSuccessMsg("Registration successful!");
      navigate('/upload'); // Redirect after successful registration
    } catch (error) {
      setErrorMsg(error.response?.data?.message || "Registration failed. Please try again.");
    }
  };
  const LoginButtonAction=()=>{
    navigate('/login');
  }

  return (
    <form onSubmit={handleRegister} className="login-form"> {/* Changed className to match the styling */}
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Register</button>
      {errorMsg && <p className="error-message">{errorMsg}</p>}
      {successMsg && <p className="success-message">{successMsg}</p>}
      <br></br>
      <br></br>

      <div >Already have an account? <span className="login-button" onClick={LoginButtonAction}>Login</span></div>
    </form>
  );
}

export default Registration;
