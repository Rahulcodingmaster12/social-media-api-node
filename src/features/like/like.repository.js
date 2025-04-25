
import mongoose from "mongoose";
import { likeSchema } from "./like.schema.js";

const likeModel = mongoose.model('like', likeSchema);

export default class LikeRepository{
    
    static async likeCommentOrPost(userid, id, type){
        try{
            const likefound = await likeModel.find({userId:userid, likeable:id});
            if(likefound.length > 0){
                return await likeModel.deleteOne({userId:userid,likeable:id});
            }else{
                const newlike = new likeModel({
                    userId:userid,
                    likeable:id,
                    types:type
                });
                await newlike.save();
                return newlike;
            }
        }catch(err){
            console.log(err);
            throw new Error("Something went wrong in the database");
        }
    }

    static async allLikes(id){
        try{
            return await likeModel.find({likeable:id});
        }catch(err){
            console.log(err);
            throw new Error("Something went wrong in the database");
        }
    }
    
}