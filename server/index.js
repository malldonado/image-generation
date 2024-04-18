import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js'; // Importação específica do método connectDB
import postRoutes from './routes/postRoutes.js'; // Importação específica das rotas postRoutes
import dalleRoutes from './routes/dalleRoutes.js'; // Importação específica das rotas dalleRoutes

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

app.get('/', (req, res) => {
    res.send('Hello World DALL-E!');
});

const startServer = async () => {
    try {
        await connectDB(process.env.MONGODB_URL);
        app.listen(8080, () => console.log('Server has started on port 8080'));
    } catch (error) {
        console.error('Error starting server:', error);
    }
}

startServer();
