import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Comment = new Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, required: true},
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    parentCommentId: { type: mongoose.Schema.Types.ObjectId },
    children: [],
    authorName: { type: 'String', required: true },
    content: { type: 'String', required: true },
    dateAdded: { type: 'Date', default: new Date(), required: true }
});

export default mongoose.model('Comment', Comment);