import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
    name:String,
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    gender:{type:String, enum:["male", "female"]},
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }], // list of friends
    friendRequest:[
        {
            sender:{type:mongoose.Schema.Types.ObjectId, ref: 'user'},
            name:String,
            status:{type:String, enum:['pending', 'accepted', 'rejected'], default:'pending'}
        }
    ]
});