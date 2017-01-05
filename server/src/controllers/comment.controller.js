import Comment from '../models/comment';
import logger from '../utils/logger';
import getFullUrl from '../utils/full-url';
import sanitize from 'sanitize-html';

let ObjectId = require('mongodb').ObjectID;



// Save comment with particular post id
export function addComment(req, res) {
    logger.debug(`Requested to save comment: ${req.body.comment} from : ${getFullUrl(req)}`);
    // logger.debug(`Comments postId: ${req.query.postId}`);

    let postId = sanitize(req.body.comment.postId);
    let parentCommentId = sanitize(req.body.comment.parentCommentId);
    let authorName = sanitize(req.body.comment.authorName);
    let content = sanitize(req.body.comment.content);

    req.db.collection('comments').insert({
        _id: new ObjectId(),
        postId: postId ? new ObjectId(postId) : null,
        parentCommentId: (parentCommentId == "null" || parentCommentId == null) ? null : parentCommentId,
        authorName: authorName,
        content: content,
        dateAdded: new Date()
    }, function(err, results) {
        if (err) {
            res.status(500).send(err);
            return;
        }

        res.status(200);
        res.json(results.ops[0]);
    });
}

// Get all comments for particular post
export function getComments(req, res) {
    logger.info(`Requested all comments from: ${getFullUrl(req)}`);
    logger.debug(`Comments postId: ${req.query.postId}`);


    let allComments = new Array();
    let commentsChecked = 0;
    let commentsLength = 0;

    function checkCommentResponses() {
        ++commentsChecked;
        if (commentsChecked === commentsLength) {
            res.json(allComments);
        }
    }

    Comment.find({ postId: req.query.postId }, function (err, comments) {
        if (err) {
            return;
            //TODO: proper error
        }

        commentsLength = comments.length;

        comments.forEach(function (comment) {
            console.log(comment._id);
            Comment.find({ parentCommentId: comment._id }, function (err, replies) {
                if (err) {
                    return;
                    //TODO: proper error
                }

                if (replies.length > 0) {
                    console.log(replies);
                    comment.children = replies;
                }

                allComments.push(comment);

                checkCommentResponses();
            });
        });
    });
}

// Delete single comment
export function deleteComment(req, res) {
    logger.info(`Requested to delete comment with id: ${req.params._id} from: ${getFullUrl(req)}`);
    logger.debug(`Comments postId: ${req.query.postId}`);

    //delete comment with property postId above
}
