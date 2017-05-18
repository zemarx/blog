'use strict';

import * as Koa from 'koa';
import postRoutes from './routes/post.routes';
import commentRoutes from './routes/comment.routes';
import userRoutes from './routes/user.routes';
import config from './config/config';
import DatabaseService from './services/database.service';

const path = require('path');
const serve = require('koa-static');
const send = require('koa-send');
const cors = require('koa-cors');
const bodyparser = require('koa-bodyparser');

const databaseService = new DatabaseService();
const app = new Koa();

// TODO: when merging new server side, change paths below

let clientIndexPath = '';

if (process.env.NODE_ENV === 'production') {
    clientIndexPath = path.resolve(__dirname, './../../client/dist');
} else if (process.env.NODE_ENV === 'development') {
    clientIndexPath = path.resolve(__dirname, './../../client/src/dist');
}


app.use(cors());
app.use(bodyparser());
app.use(postRoutes.routes());
app.use(commentRoutes.routes());
app.use(userRoutes.routes());

app.use(serve(clientIndexPath));
app.use(async ctx => {
    await send(ctx, '/index.html', { root: clientIndexPath });
});

databaseService.connect(config.db.url)
    .then(() => {
        // Start server only after connection to the database has been established
        app.listen(config.port, () => console.log(`Started listening on port ${config.port}`));
    })
    .catch(err => {
        console.log(err);
    });
