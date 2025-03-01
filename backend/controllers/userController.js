import { Image } from "../models/image.js";
import { User } from "../models/user.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//register user

const registerUser = async (req, res) => {
  const { username, password } = req.body;
  console.log("register user ", { username, password });

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hashing the password

    // check the user is already exists or not
    const IsUserExists=await User.findOne({username})
    console.log(IsUserExists, "User is already Exists")
    if(IsUserExists){
      return  res.status(401).json({message:"User is already Exists" })
    }

    const newUser = new User({ username, password: hashedPassword }); // Create a new user
    await newUser.save(); // Save the user to the database

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error saving user: ", error.message); // Log the error message
    return res.status(400).json({ message: "Error registering user", error: error.message });
  }
};

// login user

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  console.log("login user ", { username, password });

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    // compare the user password and the Database password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "invalid password" });
    }
    
// generating token 
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
    console.log(token)

    res.status(200).json({ message: "Login successful!",token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

// image uploading
export const uploadImage = async (req, res) => {
  try {
    const { description, userId } = req.body;
    const localImagePath = req.file.path; // path from multer
    console.log(req.body);

    if (!description || !userId) {
      return res
        .status(400)
        .json({ message: "Description and userId are required" });
    }

    // Upload to Cloudinary
    const cloudinaryResponse = await uploadOnCloudinary(localImagePath);
    console.log(cloudinaryResponse.url);

    if (!cloudinaryResponse) {
      return res.status(500).json({ message: "Cloudinary upload failed" });
    }
    const url = cloudinaryResponse.url;

    // Save cloudinary URL to MongoDB

    const newImage = new Image({
      url,
      description,
      userId,
    });

    await newImage.save(); // save to MongoDB

    res.status(201).json({
      message: "Image uploaded successfully",
      data: newImage,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to upload image",
      error,
    });
  }
};

const userController = {
  registerUser,
  loginUser,
};

export default userController; // Default export
