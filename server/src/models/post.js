import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Post = new Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, required: true},
    authorName: { type: 'String', required: true },
    title: { type: 'String', required: true },
    content: { type: 'String', required: true },
    dateAdded: { type: 'Date', default: new Date(), required: true }
});

export default mongoose.model('Post', Post);