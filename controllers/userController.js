const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const generateToken = (user) => {
    return jwt.sign({ user: user }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const cookieOptions = {
    httpOnly: true,
    secure: false, // Set this to true in production if using HTTPS
    sameSite: 'None', // Required for cross-origin requests
    domain: 'localhost',
};

const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const profilePicture = req.files.profilePicture ? req.files.profilePicture[0].path : '';
        const coverPicture = req.files.coverPicture ? req.files.coverPicture[0].path : '';

        const newUser = new User({
            username,
            email,
            password: await bcrypt.hash(password, 10),
            profilePicture,
            coverPicture
        });

        const savedUser = await newUser.save();
        res.status(201).json({ success: true, user: savedUser });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user || !await bcrypt.compare(req.body.password, user.password)) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = generateToken(user);
        res.cookie('token', token);
        res.json({ success: true, message: 'User logged in', user });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const resetPassword = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.password = await bcrypt.hash(req.body.newPassword, 10);
        await user.save();
        res.json({ message: 'Password reset' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const verifyEmail = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.query.email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.isVerified = true;
        await user.save();
        res.json({ message: 'Email verified' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const logout = (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'User logged out', success: true });
};

module.exports = {
    signup,
    login,
    resetPassword,
    verifyEmail,
    logout
};