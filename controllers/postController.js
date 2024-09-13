const Post = require('../models/postModel');
const jwt = require('jsonwebtoken');
const Comment = require('../models/commentModel'); // Assuming you have a Comment model

const createPost = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ success: false, message: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const image = req.file ? req.file.path : '';

        const newPost = new Post({
            ...req.body,
            image
        });

        const savedPost = await newPost.save();
        res.status(201).json({ success: true, post: savedPost });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('author')
            .populate({
                path: 'comments',
                populate: {
                    path: 'author'
                }
            })
            .populate('likes');
        res.status(200).json({ success: true, posts });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }
        res.status(200).json({ success: true, post });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const updatePost = async (req, res) => {
    try {
        const data = req.body;

        // Reduce populated fields to their Object IDs
        if (data.author && data.author._id) {
            data.author = data.author._id;
        }
        if (data.comments) {
            const newComments = [];
            data.comments = await Promise.all(data.comments.map(async comment => {
                if (comment._id) {
                    return comment._id;
                }
                if (comment.author && comment.author._id) {
                    comment.author = comment.author._id;
                }
                // Create new comment if it doesn't have an _id
                const newComment = new Comment(comment);
                const savedComment = await newComment.save();
                newComments.push(savedComment._id);
                return savedComment._id;
            }));
            data.comments = [...new Set([...data.comments, ...newComments])]; // Ensure no duplicates
        }
        if (data.likes) {
            data.likes = data.likes.map(like => like._id ? like._id : like);
        }

        const updatedPost = await Post.findByIdAndUpdate(req.params.id, data, { new: true });
        if (!updatedPost) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }
        res.status(200).json({ success: true, post: updatedPost });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const deletePost = async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        if (!deletedPost) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }
        res.status(200).json({ success: true, message: 'Post deleted' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const likePost = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ success: false, message: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }

        if (post.likes.includes(decoded.id)) {
            // Unlike
            const updatedPost = await Post.findByIdAndUpdate(req.params.id, { $pull: { likes: decoded.id } }, { new: true });
            return res.status(200).json({ success: true, post: updatedPost });
        }

        const updatedPost = await Post.findByIdAndUpdate(req.params.id, { $push: { likes: decoded.id } }, { new: true });
        res.status(200).json({ success: true, post: updatedPost });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    likePost
};