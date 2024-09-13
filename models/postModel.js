const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    likes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
    },
    comments: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Comment',
    },
    image: {
        type: String,
        default: ''
    }
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;