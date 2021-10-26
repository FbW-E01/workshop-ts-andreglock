import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRouter from './routes/apiRouter.js';
import rateLimit from 'express-rate-limit';

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

// Rate limit
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 10
});

app.use(limiter);
app.set('trust proxy', 1);

// Set static folder
app.use(express.static('public'));

app.use(cors());

app.use('/api', apiRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))