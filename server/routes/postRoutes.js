import express from 'express';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import Post from '../mongodb/models/post.js';

// Load environment variables from .env file
dotenv.config();

// Initialize Express Router
const router = express.Router();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Route to get all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find({});
        res.status(200).json({ success: true, data: posts });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Route to create a post
router.post('/', async (req, res) => {
    try {
        const { name, prompt, photo } = req.body;
        // Upload photo to Cloudinary
        const photoUrl = await cloudinary.uploader.upload(photo);
        // Create new post in MongoDB
        const newPost = await Post.create({
            name,
            prompt,
            photo: photoUrl.url,
        });
        res.status(201).json({ success: true, data: newPost });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;
