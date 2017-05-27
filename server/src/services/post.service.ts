import DatabaseService from './database.service';
import {ObjectId} from 'mongodb';

// Get a database service instance
const db = new DatabaseService();

export default class PostService {
    constructor() {}

    // Returns an array of posts
    public async getAllPosts() {
        return await db.connection().collection('posts').find({ is_archived: false }).toArray();
    }


    // Returns created post
    public async addNewPost(post) {
        if (!post.content || !post.title || !post.author_name) {
            return;
        }

        let result = await db.connection()
            .collection('posts')
            .insert({
                _id: new ObjectId(),
                author_name: post.author_name,
                title: post.title,
                is_archived: false,
                content: post.content,
                last_time_edited: null,
                date_created: new Date()
            });

        return result.ops;
    }


    // Returns an updated post object and status text
    public async updatePost(id: string, post) {
        if (!post.content || !post.title || !post.author_name) {
            return;
        }

        console.log('Updating post');

        let result = await db.connection()
            .collection('posts')
            .findOneAndUpdate(
                {
                    _id: new ObjectId(id)
                },
                {
                    $set: {
                        content: post.content,
                        title: post.title,
                        author_name: post.author_name,
                        last_time_edited: new Date()
                    }
                });

        let response = {
            text: '',
            data: {
                post: null
            }
        };

        if (result.ok === 1) {
            response.text = 'Updated post successfully';
            response.data.post = result.value;
        } else {
            response.text = 'Failed to update post';
        }

        return response;
    }


    // Returns post object
    public async getPost(id: string) {
        return await db.connection().collection('posts').findOne({ _id: new ObjectId(id) });
    }


    // Deleted post and returns status text

    // TODO: deletion actually will make the post archived, so that is can be later restored if necessary

    public async deletePost(id: string) {
        // let results = await db.connection().collection('posts').removeOne({ _id: new ObjectId(id) }); // obsolete method

        console.log('REMOVING POST FROM SERVICE' + id);

        let result = await db.connection()
            .collection('posts')
            .findOneAndUpdate(
                {
                    _id: new ObjectId(id)
                },
                {
                    $set: {
                        is_archived: true,
                    }
                });



        let isSuccess = result.result.n === 1;

        let response = {
            text: '',
            data: null
        };

        if (isSuccess) {
            response.text = `Deleted post with id: ${id} successfully`;
        } else {
            response.text = `Deletion of post with id:${id} failed`;
        }

        return response;
    }
}
