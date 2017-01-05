import { Router } from 'express';
import * as PostController from '../controllers/post.controller';
const router = new Router();
const config = require('../../config/config');

const jwt = require('express-jwt');
const authCheck = jwt({
    secret: new Buffer(config.auth.secret, 'base64'),
    audience: config.auth.audience
});

//--------TODO: ALL THE POSSIBLE REQUESTS HERE UNDER THIS COMMENT--------

// GET:    http://localhost:3000/api/posts       ---> Get all posts
// POST:   http://localhost:3000/api/posts       ---> Add one post
// PUT:    http://localhost:3000/api/posts/:_id  ---> Update one post by id
// GET:    http://localhost:3000/api/posts/:_id  ---> Get one post by id
// DELETE: http://localhost:3000/api/posts/:_id  ---> Delete one post by id

// Get all posts
router.route('/posts').get(PostController.getAllPosts); // authCheck as first parameter to get()

// Add new post
router.route('/posts').post(PostController.addPost);

// Update post
router.route('/posts/:_id').put(PostController.updatePost);

// Get one post by its id
router.route('/posts/:_id').get(PostController.getPost);

// Delete one post by its id
router.route('/posts/:_id').delete(PostController.deletePost);

export default router;
