import express from 'express';

 const likeRouter = express.Router();
import LikeController from './like.controller.js';
import jwtAuth from '../../middlewares/jwt.middleware.js';

const likeController = new LikeController();

likeRouter.post('/toggle/:id', likeController.toggleLike);
likeRouter.get('/:id', likeController.getAllLikes);

export default likeRouter;