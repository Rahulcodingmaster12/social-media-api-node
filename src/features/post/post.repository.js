import { postSchema } from "./post.schema.js";
import mongoose, { isObjectIdOrHexString } from "mongoose";
const postModel = mongoose.model('post', postSchema);

export default class PostRepository{

    static async createNewPost(id, post){
    try {
            const newPost = new postModel({
                userId:id,
                post:post
            });
            await newPost.save();
            
        } catch (err) {
            console.log(err);
            throw new Error("Something went wrong in database");
        }
    }

    static async getAll(){
        try{
            return await postModel.find();
        }catch (err) {
            console.log(err);
            throw new Error("Something went wrong in database");
        }
    }

    static async getById(id){
        try{
            return await postModel.findById(id);
        }catch (err) {
            console.log(err);
            throw new Error("Something went wrong in database");
        }
    }

    static async deleteById(id){
        try{
            return await postModel.findByIdAndDelete(id);
        }catch (err) {
            console.log(err);
            throw new Error("Something went wrong in database");
        }
    }

    static async updatebyId(userId, id, newData){
        try{
            return await postModel.findOneAndUpdate({_id:id, userId: userId}, newData, {new: true});
        }catch (err) {
            console.log(err);
            throw new Error("Something went wrong in database");
        }
    }
}