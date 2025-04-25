

import express from 'express';

 const postRouter = express.Router();
import PostController from './post.controller.js';
import jwtAuth from '../../middlewares/jwt.middleware.js';

const postController = new PostController();

postRouter.post('/', postController.createPost);
postRouter.get('/all', postController.getAllPost);
postRouter.get('/:postId', postController.getPostById);
postRouter.delete('/:postId', postController.deletePost);
postRouter.put('/:postId', postController.updatePost);

export default postRouter;