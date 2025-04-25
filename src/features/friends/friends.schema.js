

import mongoose from 'mongoose';

export const friendSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId, ref:'user', required:true},
    friendRequest:[
        {
            friendId:{type:mongoose.Schema.Types.ObjectId, ref:'user'},
            name:String
        }
    ],
    friendList:[
        {
            friendId:{type:mongoose.Schema.Types.ObjectId, ref:'user'},
            name:String
        }
    ]
})