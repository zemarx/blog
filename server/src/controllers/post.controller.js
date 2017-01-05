import logger from '../utils/logger';
import getFullUrl from '../utils/full-url';

// import getIdToken from '../utils/parseJwtToken';
// import getUserProfile from '../utils/getUserProfileWithJwtToken';

import sanitize from 'sanitize-html';

let ObjectId = require('mongodb').ObjectID;

export function getAllPosts(req, res) {
    // getUserProfile(getIdToken(req), (err, response, body) => {});
    // logger.debug(`User profile object: ${JSON.stringify(body, null, 2)}`);

    logger.info(`Requested all posts from: ${getFullUrl(req)}`);

    req.db.collection('posts')
        .find({})
        .toArray(function(err, posts) {
        if (err) {
            res.status(500).send(err);
            return;
        }

        res.status(200);
        res.json({ posts });
    });
}

export function addPost(req, res) {
    if (!req.body.post.content || !req.body.post.title || !req.body.post.authorName) {
        return;
    }

    req.db.collection('posts').insert({
        _id: new ObjectId(),
        authorName: sanitize(req.body.post.authorName),
        title: sanitize(req.body.post.title),
        content: sanitize(req.body.post.content),
        dateAdded: new Date()
    }, function(err, results) {
        if (err) {
            res.status(500).send(err);
            return;
        }

        res.status(200);
        res.json({ post: results.ops });
    });
}

export function updatePost(req, res) {
    logger.info(`Requsted to update one post with id: ${req.params._id} from: ${getFullUrl(req)}`);

    if (!req.body.post.content || !req.body.post.title || !req.body.post.authorName) {
        return;
    }

    req.db.collection('posts').findOneAndUpdate(
        {
            _id: new ObjectId(req.params._id)
        },
        {
            $set: {
                content: req.body.post.content,
                title: req.body.post.title,
                authorName: req.body.post.authorName
            }
        },
        function (err, results) {
            if (err) {
                res.status(500).send(err);
            }

            res.status(200);
            res.send("Post updated successfully");
        }
    );
}

export function getPost(req, res) {
    logger.info(`Requested one post with id: ${req.params._id} from: ${getFullUrl(req)}`);

    req.db.collection('posts').findOne({ _id: new ObjectId(req.params._id) }, function(err, post) {
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

    req.db.collection('posts').removeOne({ _id: new ObjectId(req.params._id) }, function (err, results) {
        if (err) {
            res.status(500).send(err);
            return;
        }

        if (results.result.n === 1) {
            res.status(200);
            res.send("Deleted post with id: " + req.params._id + " successfully");
        } else {
            res.status(500);
            res.send("Deletion failed");
        }
    });
}
