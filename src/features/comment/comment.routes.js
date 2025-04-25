

import express from 'express';

 const commentRouter = express.Router();
import CommentController from './comment.controller.js';
import jwtAuth from '../../middlewares/jwt.middleware.js';

const commentController = new CommentController();

commentRouter.post('/:postId', commentController.addNewComment);
commentRouter.get('/:postId', commentController.getCommentsOnPost);
commentRouter.delete('/:commentId', commentController.deleteComment);
commentRouter.put('/:commentId', commentController.updateComment);
// commentRouter.post('/', commentController);

export default commentRouter;