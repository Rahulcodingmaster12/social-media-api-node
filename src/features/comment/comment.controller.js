import CommentRepository from "./comment.repository.js";


export default class CommentController{
    
    async addNewComment(req, res){
        try {
            const userId = req.userID;
            const postId = req.params.postId;
            const {comment} = req.body;
            await CommentRepository.addComment(userId, postId, comment);
            res.status(200).send("Comment has been added successfully");
        } catch (err) {
            console.log(err);
            res.status(500).send("Something went wrong");
        }
    }

    async getCommentsOnPost(req, res){
        try{
            const postId = req.params.postId;
            const postComments = await CommentRepository.postComments(postId);
            if(!postComments){
                return res.status(400).send("Comments not found");
            }
            res.status(200).send(postComments);
        }catch (err) {
            console.log(err);
            res.status(500).send("Something went wrong");
        }
    }

    async deleteComment(req, res){
        try{
            const commentId = req.params.commentId;
            const deleted = CommentRepository.deleteById(commentId);
            if(!deleted){
                return res.status(400).send("comment not deleted");
            }
            res.status(200).send("Comment deleted successfully");
        }catch (err) {
            console.log(err);
            res.status(500).send("Something went wrong");
        }
    }

    async updateComment(req, res){
        try{
            const commentId = req.params.commentId;
            const userId = req.userID;
            const comment = req.body;
            const updatedComment = await CommentRepository.updateById(commentId, userId, comment);
            if(!updatedComment){
                return res.status(400).send("comment not found");
            }
            res.status(200).send("updated comment: "+ updatedComment);
        }catch (err) {
            console.log(err);
            res.status(500).send("Something went wrong");
        }
    }
}