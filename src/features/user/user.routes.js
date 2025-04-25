
import express from 'express';

 const userRouter = express.Router();
import UserController from './user.controller.js';
import jwtAuth from '../../middlewares/jwt.middleware.js';

const userController = new UserController();

userRouter.post('/signup', userController.signUp);
userRouter.post('/signin', userController.signIn);
userRouter.get('/logout', jwtAuth, userController.logout);
userRouter.get('/get-details/:userId',jwtAuth, userController.getDetails);
userRouter.get('/get-all-details',jwtAuth, userController.getallDetails);
userRouter.put('/update-details/:userId',jwtAuth, userController.updateDetails);


export default userRouter;