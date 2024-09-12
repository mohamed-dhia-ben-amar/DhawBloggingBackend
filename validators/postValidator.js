const Joi = require('joi');

const postSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    content: Joi.string().min(10).required(),
    author: Joi.string().required(),
    likes: Joi.array().items(Joi.string()).optional(),
    comments: Joi.array().items(Joi.string()).optional(),
    image: Joi.string().optional().allow('')
});

module.exports = postSchema;