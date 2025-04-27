import mongoose from "mongoose";

export const connectWithMongoose = async function main() {
    await mongoose.connect(process.env.DB_URL);
    console.log("Mongoose is Connected With MongoDB");
    
  }
