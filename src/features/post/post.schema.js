import mongoose from "mongoose";

export const postSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId, ref:'user'},
    post:String,
})
