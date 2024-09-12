const Comment = require('../models/commentModel');
const Post = require('../models/postModel');
const jwt = require('jsonwebtoken');

const commentController = {
    createComment: async (req, res) => {
        try {
            const token = req.cookies.token;
            if (!token) {
                return res.status(401).json({ success: false, message: 'No token provided' });
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const { content, postId } = req.body;

            const newComment = new Comment({
                content,
                author: decoded.id,
                post: postId
            });

            const savedComment = await newComment.save();

            await Post.findByIdAndUpdate(postId, { $push: { comments: savedComment._id } });

            res.status(201).json({ success: true, comment: savedComment });
        } catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    },

    getAllComments: async (req, res) => {
        try {
            const comments = await Comment.find().populate('author').populate('post');
            res.status(200).json({ success: true, comments });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    },

    getCommentById: async (req, res) => {
        try {
            const comment = await Comment.findById(req.params.id).populate('author').populate('post');
            if (!comment) {
                return res.status(404).json({ success: false, message: 'Comment not found' });
            }
            res.status(200).json({ success: true, comment });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    },

    updateComment: async (req, res) => {
        try {
            const updatedComment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedComment) {
                return res.status(404).json({ success: false, message: 'Comment not found' });
            }
            res.status(200).json({ success: true, comment: updatedComment });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    },

    deleteComment: async (req, res) => {
        try {
            const deletedComment = await Comment.findByIdAndDelete(req.params.id);
            if (!deletedComment) {
                return res.status(404).json({ success: false, message: 'Comment not found' });
            }
            await Post.findByIdAndUpdate(deletedComment.post, { $pull: { comments: deletedComment._id } });
            res.status(200).json({ success: true, message: 'Comment deleted' });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    }
};

module.exports = commentController;