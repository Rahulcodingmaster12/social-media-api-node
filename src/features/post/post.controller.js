import PostRepository from "./post.repository.js";


export default class PostController{
    
    async createPost(req, res){
        try{
        const {post} = req.body;
        const id = req.userID;
        await PostRepository.createNewPost(id, post);
        res.status(200).send("Post added successfully");
        }catch(err){
            console.log(err);
            res.status(500).send("Something went wrong");
        }
    }

    async getAllPost(req, res){
        try{    
            const allpost = await PostRepository.getAll();
            if(!allpost){
                return res.status(400).send("No post to show");
            }
            res.status(200).send(allpost);
        }catch(err){
            console.log(err);
        }
    }

    async getPostById(req, res){
        try{
            const postId = req.params.postId;
            const post = await PostRepository.getById(postId);
            if(!post){
                return res.status(400).send("Post not found");
            }
            res.status(200).send(post);
        }catch(err){
            console.log(err);
        }
    }

    async deletePost(req, res){
        try {
            const postId = req.params.postId;
            const deleted = await PostRepository.deleteById(postId);
            if(!deleted){
                return res.status(400).send("Post is not deleted");
            }
            res.status(200).send("Deleted Data: "+ deleted);
        } catch (err) {
            console.log(err);
        }
    }

    async updatePost(req, res){
        try {
            const postId = req.params.postId;
            const userId = req.userID;
            const newData = req.body;
            const updated = await PostRepository.updatebyId(userId, postId, newData);
            if(!updated){
                return res.status(400).send("Post not found");
            }
            res.status(200).send("Updated Data: "+ updated);
        } catch (err) {
            console.log(err);
        }
    }

}