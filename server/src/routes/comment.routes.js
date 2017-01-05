import { Router } from 'express';
import * as CommentController from '../controllers/comment.controller';
const router = new Router();

// Get all comments for particular post
router.route('/comments').get(CommentController.getComments);

// Add one comment for particular post
router.route('/comments').post(CommentController.addComment);

// Delete a post by its id
router.route('/comments').delete(CommentController.deleteComment);

export default router;