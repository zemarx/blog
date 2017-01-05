import Post from '../models/post';
import logger from '../utils/logger';
import getFullUrl from '../utils/full-url';

import getIdToken from '../utils/parseJwtToken';
import getUserProfile from '../utils/getUserProfileWithJwtToken';


import sanitize from 'sanitize-html';

let ObjectId = require('mongodb').ObjectID;

export function getAllPosts(req, res) {
    // // getUserProfile(getIdToken(req), (err, response, body) => {
    //     // logger.debug(`User profile object: ${JSON.stringify(body, null, 2)}`);
    //
    //     logger.info(`Requested all posts from: ${getFullUrl(req)}`);
    //
    //     Post.find().sort('-dateAdded').exec((err, posts) => {
    //         if (err) {
    //             res.status(500).send(err);
    //             return;
    //         }
    //
    //         res.status(200);
    //         res.json({ posts });
    //     });
    // // });


    //-----FIND ALL------::GET-----
    req.db.collection('posts').find({}).toArray(function(err, posts) {
        if (err) {
            res.status(500).send(err);
            return;
        }

        res.status(200);
        res.json({ posts });
    });
}

export function addPost(req, res) {
    if (!req.body.post.authorName || !req.body.post.title || !req.body.post.content) {
        res.status(403).end();
    }

    logger.debug(`Requested to save post: ${req.body.post} from : ${getFullUrl(req)}`);

    let newPost = new Post({
        _id: new ObjectId(),
        authorName: sanitize(req.body.post.authorName),
        title: sanitize(req.body.post.title),
        content: sanitize(req.body.post.content),
        dateAdded: new Date()
    });

    newPost.save((err, savedPost) => {
        if (err) {
            res.status(500).send(err);
            return;
        }

        res.status(200);
        res.json({ post: savedPost });
    });
}

export function updatePost(req, res) {
    logger.info(`Requsted to update one post with id: ${req.params._id} from: ${getFullUrl(req)}`);

    let newAuthorName = req.body.post.authorName;
    let newTitle = req.body.post.title;
    let newContent = req.body.post.content;

    let dateUpdated = null;

    Post.findByIdAndUpdate(
        req.params._id,
        {
            $set: {
                content: newContent,
                title: newTitle,
                authorName: newAuthorName
            }
        },
        {
            new: true
        },
        (err, newPost) => {
            if (err) {
                res.status(500).send(err);
                return;
            }

            res.status(200);
            res.json({ post: newPost})
        }
    );
}

export function getPost(req, res) {
    logger.info(`Requested one post with id: ${req.params._id} from: ${getFullUrl(req)}`);

    Post.findOne({
        _id: req.params._id
    })
        .exec((err, post) => {
            if (err) {
                res.status(500).send(err);
                return;
            }

            res.json({ post });
        });
}

export function deletePost(req, res) {
    logger.info(`Requested to delete post with id: ${req.params._id} from: ${getFullUrl(req)}`);

    //TODO: also delete comments of that post

    Post.findOne({
        _id: req.params._id
    })
        .exec((err, post) => {
            if (err) {
                //TODO: send deleted post's id in response
                res.status(500).send(err);
                return;
            }

            post.remove(() => {
                res.status(200).end();
            });
        });
}
