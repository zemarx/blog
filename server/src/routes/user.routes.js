import { Router } from 'express';
import * as UserController from '../controllers/user.controller';
const router = new Router();

// Get one post
router.route('/users/:_id').get(UserController.getUser);

// Add new post
router.route('/users').post(UserController.addUser);

// Delete a post by its id
router.route('/users/:_id').delete(UserController.deleteUser);

export default router;