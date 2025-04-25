import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";
import { ObjectId } from "mongoose";

export const userModel = mongoose.model('user', userSchema);
export default class UserRepository{
    

    static async SignUp(newUser){
        try{
            
             const add = new userModel(newUser);
              return await add.save();
        }catch(err){
            console.log(err);
            throw new Error("Something went wrong in the database");
        }
    }
    static async findByEmail(email){
        try{
            return await userModel.findOne({email});
          
        }catch(err){
            console.log(err);
            throw new Error("Something went wrong in the database");
        }
    }

    static async getUser(userid){
       
        try{
            return await userModel.findById(userid).select('-password');
        }catch(err){
            console.log(err);
            throw new Error("Something went wrong in the database");
        }
    }

    static async getallUsers(){
        try{
            return await userModel.find().select('-password');
        }catch(err){
            console.log(err);
            throw new Error("Something went wrong in the database");
        }
    }

    static async updateById(newDetails, userId){
        try{
             await userModel.findByIdAndUpdate(userId, newDetails).select('-password');
             return await userModel.findById(userId).select('-password');
        }catch(err){
            console.log(err);
            throw new Error("Something went wrong in the database");
        }
    }
}