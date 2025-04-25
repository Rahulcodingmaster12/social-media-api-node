import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
    email:{type:String, require:true},
    otp:{type:String, require:true},
    createdAt:{type:Date, default:Date.now, expires:300}
});

export const otpModel = mongoose.model('otp', otpSchema);