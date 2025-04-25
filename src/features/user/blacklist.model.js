

import mongoose from 'mongoose';

const blacklistSchema = new mongoose.Schema({
    token:{type:String, required:true},
    createdAt:{type:Date, default: Date.now, expires:'1h'} //auto delete after 1hr

});

export const blacklistModel = mongoose.model('Blacklist', blacklistSchema);