import { connectWithMongoose } from "./src/config/mongooseConfig.js";
import express from 'express';
import  userRouter from "./src/features/user/user.routes.js";
import postRouter from "./src/features/post/post.routes.js";
import commentRouter from "./src/features/comment/comment.routes.js";
import likeRouter from "./src/features/like/like.routes.js";
import friendsRouter from "./src/features/friends/friends.routes.js";
import otpRouter from "./src/features/otpmanagement/otp.routes.js";
import jwtAuth from "./src/middlewares/jwt.middleware.js";
import dotenv from 'dotenv';
dotenv.config();


const server = express();
server.use(express.json());
server.use('/api/user', userRouter);
server.use('/api/posts', jwtAuth, postRouter);
server.use('/api/comments', jwtAuth, commentRouter);
server.use('/api/likes', jwtAuth, likeRouter);
server.use('/api/friends',jwtAuth, friendsRouter);
server.use('/api/otp',jwtAuth, otpRouter );
server.get('/',(req,res)=>{
    res.status(200).send('Welcome to Social Media');
    // console.log('Welcome to Social Media');
})
server.listen(4100, ()=>{
    console.log("Server is running at 4100");
    connectWithMongoose();
})