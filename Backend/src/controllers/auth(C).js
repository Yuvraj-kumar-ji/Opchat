import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { generateToken } from '../lib/utils.js';
import {sendWelcomeEmail} from "../emails/emailHandler.js";
import {ENV} from "../lib/env.js";

export const Register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Please provide username, email and password' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Please provide a valid email address' });
        }

        const user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'User with this email already exists' });
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        if (newUser) {
            generateToken(newUser._id, res);
            const savedUser = await newUser.save();
            res.status(201).json({
                _id: savedUser._id,
                username: savedUser.username,
                email: savedUser.email,
                profilepic: savedUser.profilepic,
            });

            try {
                await sendWelcomeEmail(email, username, ENV.mainURL);
            } catch (emailError) {
                console.error('Error sending welcome email:', emailError);
            }
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    }
    catch (error) {
        console.error(`Error in saving new user: ${error.message}`);
        res.status(500).json({ message: 'InternalServer error' });
    }
};

export const Login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }
        const user = await User.findOne({ email });     // i need to ask about user to ai
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
        generateToken(user._id, res);
        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            profilepic: user.profilepic,
        });
    } catch (error) {
        console.error(`Error in user login: ${error.message}`);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const Logout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
};

export const checkAuth = async (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.error(`Error in checkAuth: ${error.message}`);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const {profilepic} = req.body;
        if (!profilepic) {
            return res.status(400).json({ message: 'Please provide a profile picture URL' });
        }
        const userid = req.user._id;

        const uploadresponse = await cloudinary.uploader.upload(profilepic);

        const updatedUser = await User.findByIdAndUpdate(userid, { profilepic: uploadresponse.secure_url }, { new: true });

        res.status(200).json(updateUser);
    } catch (error) {
        console.error(`Error in updating profile: ${error.message}`);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};