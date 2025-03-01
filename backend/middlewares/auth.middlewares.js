import jwt from 'jsonwebtoken'
import { User } from '../models/user.js';

// export const  verifyJWT=async(req , res , next)=>{

//           try{
//                     const token=req.cookies.accessToken||
//                     req.header("Authorization")?.replace("Bearer ","");
//                     console.log(token)

//                     if(!token){
//                          res.status(401).json({message:"Unauthorized request"})
//                     }

//                     const decodedToken=jwt.verify(token , process.env.ACCESS_TOKEN_SECRET);

//                     const user=await User.findById(decodedToken?._id).select("-password");

//                     if(!user){
//                               res.status(401).json({message: "Invalid AccessToken"})
//                     }
//                     req.user=user;
//                     next();

//           }catch(error){
//                     res.status(401).json({message:error?.message || "Invalid AccessToken"})
//           }

// }

export const verifyJWT = (req, res, next) => {
          const authHeader = req.headers['authorization'];
          const token = authHeader && authHeader.split(' ')[1]; // Get token from 'Bearer TOKEN'
        
          if (!token) return res.sendStatus(401); // If no token, respond with 401
        
          jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.sendStatus(403); // If token is invalid, respond with 403
            req.user = user; // Store user info in request
            next(); // Proceed to the next middleware
          });
        };