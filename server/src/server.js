const express = require('express');
const Router = express.Router;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const jwt = require('express-jwt');
const cors = require('cors');
const auth0 = require('auth0');
const mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const config = require('../config/config');
const db_url = config.database.url;
const port = process.env.PORT || 3000;

//---------------IMPORT ROUTES--------------------

import postRoutes from './routes/post.routes';
import commentRoutes from './routes/comment.routes';

//----------SETUP DATABASE CONNECTION---------------
let db;

MongoClient.connect(db_url, function(err, database) {
    if(err) throw err;

    db = database;

    app.listen(port, function () {
        console.log('Server is listening on port: ' + port);
    });
});

app.use(cors());
app.use(function (req, res, next) {
    req.db = db;
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// ===============app.use(express.static(path.join(__dirname, 'client')))

app.use(express.static('./../client')); //'/' + path.relative(__dirname, '../client')));
app.use('/', express.static('./../client')); //'/' + path.relative(__dirname, '../client')));

console.log(path.relative(__dirname, '../client'));

// app.use(express.static('/Users/lagorithm/workspace/angular_projects/blog_final/client'));
// app.use('/', express.static('/Users/lagorithm/workspace/angular_projects/blog_final/client'));

app.use('/api', postRoutes);
app.use('/api', commentRoutes);


const htmlIndexRouter = new Router();

htmlIndexRouter.get('*', function (req, res) {
    res.sendFile('index.html', {root: './../client'});
});

app.use(htmlIndexRouter);
