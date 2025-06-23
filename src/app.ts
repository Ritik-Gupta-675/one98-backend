import express from 'express';
import cors from 'cors';
import articleRoutes from './routes/articles.routes';
import uploadRoutes from './routes/upload.routes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/articles', articleRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/jokes', (req, res) => {
    const jokes = [
        { id: 1, joke: 'Why was the math book sad?' },
        { id: 2, joke: 'Why was the math book sad?' },
        { id: 3, joke: 'Why was the math book sad?' },
        { id: 4, joke: 'Why was the math book sad?' },
        { id: 5, joke: 'Why was the math book sad?' },
    ];
    res.send(jokes);
});

export default app;
