import mongoose from "mongoose"

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("200!");
  } 
  catch(error){
    console.error("oh no error connecting DB!", error);
    // process.exit(1); //exit with failure. 0 means success. 1 mean failure
  }
}