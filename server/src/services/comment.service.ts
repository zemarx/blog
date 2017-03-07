// import { sanitize } from 'sanitize-html';
import DatabaseService from './database.service';
import {ObjectId} from 'mongodb';
import makeTree from '../utils/makeTree';

const dbService = new DatabaseService();

export default class CommentService {
    constructor() {}

    // Get all comments of a post with 'postId'
    public async getPostComments(postId: string) {
        let comments = await dbService
            .connection()
            .collection('comments')
            .find({ postId: new ObjectId(postId) })
            .toArray();

        // Create a json tree object from adjacent list of comments
        let commentTree = makeTree(comments);

        return commentTree;
    }

    // Add new comment to a particular post
    public async addNewComment(comment) {
        let postId = (comment.postId);
        let parentId = (comment.parentId);
        let authorName = (comment.authorName);
        let content = (comment.content);

        let results = await dbService
            .connection()
            .collection('comments')
            .insert({
                _id: new ObjectId(),
                postId: (postId !== '' && postId !== null && postId !== 'null') ? new ObjectId(postId) : null,
                parentId: (parentId !== '' || parentId !== null || parentId !== 'null') ? parentId : null,
                authorName: authorName,
                content: content,
                dateAdded: new Date(),
                children: []
            });

        return results.ops[0];
    }

    public async updateComment(id: string) {
        console.log('Update post with id: ' + id);
        console.log('Not implemented yet :(');
    }

    public async deleteComment(id: string) {
        console.log('Delete post with id: ' + id);
        console.log('Not implemented yet :(');
    }
}
