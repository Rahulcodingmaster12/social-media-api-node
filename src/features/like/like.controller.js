import LikeRepository from "./like.repository.js";


export default class LikeController{
    
    async toggleLike(req, res){
        try{
            const {type} = req.body;
            const id = req.params.id; 
            const userId = req.userID;
            const like = await LikeRepository.likeCommentOrPost(userId, id, type);
            console.log(like);
            if(like.deletedCount === 0){
                return res.status(200).send(`like is removed from ${type} successfully`);
            }
             res.status(200).send(`${type} is liked successfully`);
        }catch(err){
            console.log(err);
            res.status(400).send("Something went wrong");
        }
    }

    async getAllLikes(req, res){
        const id = req.params.id;
        const allLikes = await LikeRepository.allLikes(id);
        if(!allLikes){
            return res.status(400).send("No likes found");
        }
        res.status(200).send(allLikes);
    }catch(err){
        console.log(err);
        res.status(400).send("Something went wrong");
    }
}