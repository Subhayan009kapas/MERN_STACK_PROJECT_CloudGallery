import axios from "axios";
import React, { useState } from "react";
import "./Login.css"; // Import CSS for styling
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate=new useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        username,
        password,
      });

      localStorage.setItem('token', response.data.token); // Save the Access Token in local storage 
      console.log(response.data.token)
      localStorage.setItem('username',username)
     

      alert("User logged in successfully!");
      setUsername("");
      setPassword("");
      setErrorMessage("");
      setSuccessMsg("Successfully logged in, " + username + "!");
      navigate('/upload')
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Login failed. Please try again.");
      setSuccessMsg(""); // Clear success message on error
    }
  };

  const registerButtonAction=()=>{
    navigate('/register')
  }

  return (
    <form onSubmit={handleLogin} className="login-form">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMsg && <p className="success-message">{successMsg}</p>}
      <br></br>
      <br></br>

      <div >Do not have account ? <span className="register-button" onClick={registerButtonAction}>Register</span></div>
    </form>
  );
}

export default Login;
