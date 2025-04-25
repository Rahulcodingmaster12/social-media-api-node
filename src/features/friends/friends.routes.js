

import express from 'express';

import FriendsController from './friends.controller.js';
import jwtAuth from '../../middlewares/jwt.middleware.js';

const friendsRouter = express.Router();
const friendsController = new FriendsController();

friendsRouter.post('/toggle-friendship/:friendId', friendsController.toggleFriendRequest);
friendsRouter.post('/response-to-request/:friendId', friendsController.sendFriendRequest);
friendsRouter.post('/get-friends/:friendId', friendsController.getAllFriends);
// friendsRouter.post('/', friendsController);

export default friendsRouter;