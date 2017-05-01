// import { sanitize } from 'sanitize-html';
import DatabaseService from './database.service';
import {ObjectId} from 'mongodb';
import makeTree from '../utils/makeTree';

const dbService = new DatabaseService();

export default class CommentService {
    constructor() {}

    // Get all comments of a post with 'postId'
    public async getPostComments(post_id: string) {
        let comments = await dbService
            .connection()
            .collection('comments')
            .find({ postId: new ObjectId(post_id) })
            .toArray();

        // Create a json tree object from adjacent list of comments
        let commentTree = makeTree(comments);

        return commentTree;
    }

    // Add new comment to a particular post
    public async addNewComment(comment) {
        let post_id = (comment.post_id);
        let parent_id = (comment.parent_id);
        let author_name = (comment.author_name);
        let content = (comment.content);

        let results = await dbService
            .connection()
            .collection('comments')
            .insert({
                _id: new ObjectId(),
                postId: (post_id !== '' && post_id !== null && post_id !== 'null') ? new ObjectId(post_id) : null,
                parentId: (parent_id !== '' || parent_id !== null || parent_id !== 'null') ? parent_id : null,
                authorName: author_name,
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
