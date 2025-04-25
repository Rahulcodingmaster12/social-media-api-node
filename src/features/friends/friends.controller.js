import FriendsRepository from "./friends.repository.js";


export default class FriendsController{

    async toggleFriendRequest(req, res){
        try{
            const userId = req.userID;
            const friendId = req.params.friendId;
            const toggleReqResult = await FriendsRepository.toggleFriendship(userId, friendId);
            res.status(200).send(toggleReqResult);
        }catch(err){
            console.log(err);
            res.status(500).send("Something went wrong");
        }
    }

    async getAllFriends(req, res){
        try{
            const userId = req.userID;
            const allFriends = await FriendsRepository.findFriends(userId);
            if(allFriends){
                return res.status(200).send(allFriends);
            }
            res.status(400).send("No friends to show");
        }catch(err){
            console.log(err);
            res.status(500).send("Something went wrong");
        }
    }

    async sendFriendRequest(req, res){
        try{
            const userId = req.userID;
            const friendId = req.params.friendId;
            const friendAdded = await FriendsRepository.sendRequest(userId, friendId);
            console.log(friendAdded);
            return res.status(200).send(friendAdded);
           
        }catch(err){
            console.log(err);
            res.status(500).send("Something went wrong");
        }
    }
}