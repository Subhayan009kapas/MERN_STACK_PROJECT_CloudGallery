import mongoose, { Schema } from "mongoose";

const ImageSchema=new Schema({
          url:{
                    type:String,
                    required:true,

          },
          description:{
                    type:String,
                    required:true,
          },
          userId:{
                    
                    type:String,

          }
})

export const Image=mongoose.model("Image",ImageSchema)