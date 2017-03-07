'use strict';

import * as Router from 'koa-router';

const router = new Router({ prefix: '/api'});

// Attempt to login user
// In the request body might be login(email) and password
router.post('/login', async (ctx, next) => {
    // TODO: maybe implement
});

// Creates new user
// In the request body might be login(email) and password and maybe something else
router.post('/users', async (ctx, next) => {
    // TODO: maybe implement (change url path to something else???)
});

export default router;
