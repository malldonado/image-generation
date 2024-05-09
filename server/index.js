import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Routes
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

// Default route
app.get('/', (req, res) => {
    res.send('Hello World DALL-E!');
});

// Start server
const startServer = async () => {
    try {
        // Connect to MongoDB
        await connectDB(process.env.MONGODB_URL);
        // Start Express server
        const PORT = process.env.PORT || 8080;
        app.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
    } catch (error) {
        console.error('Error starting server:', error);
    }
};

startServer();
