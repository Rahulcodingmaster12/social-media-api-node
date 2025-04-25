

import mongoose from 'mongoose';

export const commentSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId, ref:'user'},
    postId:{type:mongoose.Schema.Types.ObjectId, ref:'post'},
    comment:String
    
})