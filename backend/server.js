import express from "express";          // Import Express
import connectDB from "./db/index.js";  // Import the database connection function
import authRoute from "./routes/auth.js"; // Import authentication routes
import dotenv from "dotenv";  
import cors from 'cors';           // Import dotenv for environment variables

dotenv.config(); // Load environment variables from .env file
const app = express(); 

const port = process.env.PORT || 3000; 
app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors()) // enbale cors for all routes 

connectDB(); // Connect to MongoDB

// Example endpoint to return jokes
app.get('/api', (req, res) => {
    const jokes = [
        { title: "akash", content: "kaharacha" },
        { title: "subhayan", content: "doctor" }
    ];
    res.send(jokes); // Send jokes as response
});


app.use("/auth", authRoute);

import uploadRouter from './routes/auth.js'; // Update this with your actual router file path
app.use('/upload', uploadRouter); // `/upload` will be the route prefix

app.listen(port, () => {
    console.log(`Server is running at port ${port}`); // Start server and log the port
});
