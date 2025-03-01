import { Router } from "express";

import { User } from "../models/user.js";
// import { loginUser, registerUser } from "../controllers/userController.js";

import userController, { uploadImage } from "../controllers/userController.js";
import { upload } from "../middlewares/multer.middlewares.js";
import { Image } from "../models/image.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
const { loginUser, registerUser } = userController; // Destructuring
import mongoose from "mongoose";

const router = Router();

// for register user

// router.post("/register", async (req, res) => {
//   const { username, password } = req.body;
//   console.log("register user ",{username , password})
//   try {
//     const newuser = new User({ username, password });
//     await newuser.save();
//     return res.status(201).json({ message: "User resgister successfully" });
//   } catch (error) {
//     res.status(400).json({ message: "Error registering user", error });
//   }
// });


// login

// router.post("/login", async (req, res) => {
//   const { username, password } = req.body;
//   console.log("login user ",{username , password})

//   try {
//     const user = await User.findOne({ username });

//     if (!user) {
//       return res.status(404).json({ message: "user not found" });
//     }

//     if (password != user.password) {
//       return res.status(400).json({ message: "invalid password" });
//     }

//     res.status(200).json({ message: "Login successful!" });
//   } catch (error) {
//     res.status(500).json({ message: "Error logging in", error });
//   }

  

// });



router.route('/register').post(registerUser)
router.route('/login').post(loginUser)


router.post('/upload', verifyJWT,  upload.single("image"), uploadImage);



// get all user from User Schema
router.get('/',async(req, res)=>{
  try{
    const users=await User.find()  // to find all user 
    res.status(200).json(users)
  }catch(error){
    res.status(500).json({message:"error fetching user ", error})
  }
})

// to get all the images from the Image Schema
router.get('/images',async(req, res)=>{
  const userId = req.query.userId;
  try{
    const images=await Image.find({userId})
    res.status(200).json(images)
  }
  catch(error){
    res.status(500).json({message:"error fetching in Image", error });
  }

})

// DELETE endpoint to remove an image
router.delete('/images/:id', async (req, res) => {
  const imageId = req.params.id;

  // Validate the ID format
  if (!mongoose.Types.ObjectId.isValid(imageId)) {
    return res.status(400).json({ message: 'Invalid image ID format' });
  }

  try {
    const deletedImage = await Image.findByIdAndDelete(imageId);
    if (!deletedImage) {
      return res.status(404).json({ message: 'Image not found' });
    }
    res.json({ message: 'Image deleted successfully' });
    console.log("Image deleted successfully")
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ message: 'Server error' });
  }
});


export default router;
