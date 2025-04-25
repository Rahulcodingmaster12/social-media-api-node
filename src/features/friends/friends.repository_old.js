import mongoose from "mongoose";
import { friendSchema } from "./friends.schema.js";
import { userModel } from "../user/user.repository.js";

// const friendModel = mongoose.model('friend', friendSchema);
export default class FriendsRepository{
    
    static async toggleRequest(userId, friendId){
      const user = await friendModel.findOne({userId:userId});
    //   const friend = await friendModel.findOne({userId:friendId});
      if(!user){
        return "user not found"
      }

    //   check if the friend is already present in the friendList
    const isFriend = user.friendList.some(friend => friend.friendId.toString() === friendId);

    if(isFriend){
        // if they are friends remove them from both the friend list
        await friendModel.findOneAndUpdate(
            {userId},
            {$pull:{friendList:{friendId}}}
        );

        await friendModel.findOneAndUpdate(
            {userId:friendId},
            {$pull:{friendList:{friendId:userId}}}
        );
        return "Friend removed successfully"
    }else{
        // if they not friends add to each other to thier friend list
        // console.log(friend.name);
        const frndIdx = user.friendList.findIndex(p => p.friendId == friendId);
        // const frndName = user.friendList[frndIdx].name;
        await friendModel.findOneAndUpdate(
            {userId},
            {$addToSet:{friendList:{friendId, frndName}}},
            {upsert: true}
        );

        await friendModel.findOneAndUpdate(
            {userId:friendId},
            {$addToSet:{friendList:{friendId:userId, name:user.name}}},
            {upsert: true}
        );
        return "Friend added to both the user's friendlist"
    }

    }

    static async friend(userId, friendId){
        try{
            const user = await userModel.findById(friendId);
            return await friendModel.findOneAndUpdate(
                {userId},
                {$push:{friendRequest:{friendId, name:user.name}}},
                {upsert:true, new:true}
            )
        }catch(err){
            console.log(err);
            throw new Error("Something went wrong in the database");
        }
    }

    static async findFriends(userId){
        try{
            return await friendModel.findOne({userId}).populate('friendList.friendId', 'friendList.name');
        }catch(err){
            console.log(err);
            throw new Error("Something went wrong in the database");
        }
    }
}