import mongoose from "mongoose";
import { commentSchema } from "./comment.schema.js";

const commentModel = mongoose.model('comment', commentSchema);

export default class CommentRepository{
    
    static async addComment(userId, postId, comment){
        try{
        const newComment = new commentModel({
            userId:userId,
            postId:postId,
            comment:comment
        });
        await newComment.save();
        } catch (err) {
            console.log(err);
            throw new Error("Something went wrong in database");
        }
    }

    static async postComments(postId){
        try{
            return await commentModel.find({postId});
        }catch (err) {
            console.log(err);
            throw new Error("Something went wrong in database");
        }
    }

    static async deleteById(id){
        try{
            return await commentModel.findByIdAndDelete(id);
        }catch (err) {
            console.log(err);
            throw new Error("Something went wrong in database");
        }
    }

    static async updateById(id, userId, comment){
        try{
            return await commentModel.findOneAndUpdate({_id:id , userId:userId}, comment, {new:true});
        }catch (err) {
            console.log(err);
            throw new Error("Something went wrong in database");
        }
    }
}