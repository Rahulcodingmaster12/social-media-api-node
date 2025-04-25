
import { otpModel } from "./otp.schema.js";

export class OtpRepository{

    static async saveOtp(email, otp){
        try{
            return await otpModel.create({email, otp})
        }catch(err){
            console.log(err);
            throw new Error("Something went wrong in the database");
        }
    }

    static async deleteOtp(email){
        try{
            return await otpModel.deleteOne({email})
        }catch(err){
            console.log(err);
            throw new Error("Something went wrong in the database");
        }
    }

    static async getOtp(email){
        try{
            return await otpModel.findOne({email}).sort({created: -1});
        }catch(err){
            console.log(err);
            throw new Error("Something went wrong in the database");
        }
    }
}