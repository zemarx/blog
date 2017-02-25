import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Comment = new Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, required: true},
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    parentId: { type: mongoose.Schema.Types.ObjectId },
    authorName: { type: 'String', required: true },
    content: { type: 'String', required: true },
    dateAdded: { type: 'Date', default: new Date(), required: true },
    children: []
});

export default mongoose.model('Comment', Comment);