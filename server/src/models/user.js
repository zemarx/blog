import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const User = new Schema({
    _id: { type: 'Number', required: true},
    username: { type: 'String', required: true },
    password: { type: 'String', required: true },
    permissions: { type: 'String', required: true },
});

export default mongoose.model('User', User);