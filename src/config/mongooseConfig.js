import mongoose from "mongoose";

export const connectWithMongoose = async function main() {
    await mongoose.connect(process.env.DB_URL);
    console.log("Mongoose is Connected With MongoDB");
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
  }