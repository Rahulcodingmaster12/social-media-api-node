
import mongoose from 'mongoose';

export const likeSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId, ref:'user', required:true},
    likeable:{type:mongoose.Schema.Types.ObjectId, refPath:'types'},
    types:{type:String, enum:['post', 'comment']}

})