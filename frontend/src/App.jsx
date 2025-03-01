import { useState } from "react";

import "./App.css";
import { useEffect } from "react";
import axios from "axios";
import Registration from "./components/Registration";
import Login from "./components/Login";
import UploadImage from "./components/UploadImage";
import { BrowserRouter as Router, Route,  Routes } from 'react-router-dom';
import LandingPage from "./components/LandingPage";

function App() {
  const [text, settext] = useState([]);
  const [users, setusers] = useState([]);
  const [error, setError] = useState(null);
  
  const [token, setToken] = "";
  useEffect(() => {
    axios
      .get("/api")
      .then((response) => {
        settext(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // To fetch all the users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/auth");
        setusers(response.data);
      } catch (error) {
        setError(error);
      }
    };
    fetchUsers();
  }, []);

  if (error) return <p>error fetching in users</p>;

  //to fetch all the images



  return (
    <>
    
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/upload" element={< UploadImage/>} />
      </Routes>
    </Router>
    
      

      {/* <h1>users list</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id}>{user.username}</li>
        ))}
      </ul> */}
      {/* <div className="register-login">
        <Registration />
        <Login />
      </div> */}

      {/* <div>
        <UploadImage />
      </div> */}

      
    </>
  );
}

export default App;
