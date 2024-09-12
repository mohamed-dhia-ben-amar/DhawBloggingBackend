const Joi = require('joi');

const userSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    profilePicture: Joi.string().optional().allow(''),
    coverPicture: Joi.string().optional().allow(''),
    followers: Joi.array().items(Joi.string()).optional(),
    followings: Joi.array().items(Joi.string()).optional(),
    isAdmin: Joi.boolean().optional(),
    desc: Joi.string().max(50).optional(),
    city: Joi.string().max(50).optional(),
    posts: Joi.array().items(Joi.string()).optional(),
    savedPosts: Joi.array().items(Joi.string()).optional()
});

module.exports = userSchema;