'use strict';

import * as Router from 'koa-router';
import PostService from '../services/post.service';

const postService = new PostService();
const router = new Router({ prefix: '/api'});

// GET:    http://localhost:3000/api/posts       ---> Get all posts
// POST:   http://localhost:3000/api/posts       ---> Add one post
// PUT:    http://localhost:3000/api/posts/:_id  ---> Update one post by id
// GET:    http://localhost:3000/api/posts/:_id  ---> Get one post by id
// DELETE: http://localhost:3000/api/posts/:_id  ---> Delete one post by id

// Get all posts
// Returns object "posts" of type array with all the posts
router.get('/posts', async (ctx, next) => {
    try {
        let posts = await postService.getAllPosts();

        ctx.body = { posts: posts };
    } catch (err) {
        // TODO: send error object to client
        console.log(err);
    }
});

// Add new post
// Retuns created post in response
router.post('/posts', async (ctx, next) => {
    try {
        ctx.body = await postService.addNewPost(ctx.request.body.post);
    } catch (err) {
        // TODO: send error object to client
        console.log(err);
    }
});

// Update post
router.put('/posts/:_id', async (ctx, next) => {
    try {
        ctx.body = await postService.updatePost(ctx.params._id, ctx.request.body.post);
    } catch (err) {
        // TODO: send error object to client
        console.log(err);
    }
});

// Get one post by id
router.get('/posts/:_id', async (ctx, next) => {
    try {
        ctx.body = await postService.getPost(ctx.params._id);
    } catch (err) {
        // TODO: send error object to client
        console.log(err);
    }
});

// Delete one post by id
router.delete('/posts/:_id', (ctx, next) => {
    try {
        ctx.body = postService.deletePost(ctx.params._id);
    } catch (err) {
        // TODO: send error object to client
        console.log(err);
    }
});

export default router;
