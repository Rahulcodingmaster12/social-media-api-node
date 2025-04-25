

import { userModel } from "../user/user.repository.js";
import UserRepository from "../user/user.repository.js";
export default class FriendsRepository{
    // if a is sending request to b then add a to b's friendrequest array
    static async sendRequest(userId, friendId){

        if(userId == friendId){
            return "Cannot send friend request";
        }

        const friend = await userModel.findById(friendId);
        if(!friend){
            return "friend not found";
        }

        // check if already friends
        if(friend.friends.includes(friendId)){
            return "Already a friend";
        }
        // add a friend request
        await userModel.findByIdAndUpdate(
            friendId,
            {$addToSet:{friendRequest:{sender:userId, status:'pending'}}}
        );
        return "Friend request sent";
    }

    static async toggleFriendship(userId, friendId){
        try{
        const user = await userModel.findById(userId);
        console.log(user);
        const findFriend = user.friendRequest.find(p => p.sender == friendId)
        console.log(findFriend.status);
        if(!['accepted', 'rejected', 'pending'].includes(findFriend.status)){
            return "Invalid status";
        }

        
        // add friend to both the persons
        if(findFriend.status == 'pending'){
            await userModel.findByIdAndUpdate(userId, {$push:{friends:friendId}});
            await userModel.findByIdAndUpdate(friendId, {$push:{friends:userId}});
        }
        // update friend request status i.e, remove it from friend request
        await userModel.findByIdAndUpdate(
            userId,
            {$pull:{friendRequest:{sender:friendId}}}
        );
        return "Request is accepted";
    }catch(err){
        console.log(err);
        throw new Error("Something went wrong in the database");
    }

    }

    static async getAll(userId){
        try{
           return await userModel.findById(userId).populate('friends', 'name', 'email');
        }catch(err){
        console.log(err);
        throw new Error("Something went wrong in the database");
    }
    }
}