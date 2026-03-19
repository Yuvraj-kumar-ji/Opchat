import express from 'express';
import dotenv from 'dotenv';

dotenv.config();    // Load environment variables from .env file

// Getting the file from router
import authRouter from './routers/auth(R).js';    

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/api/auth', authRouter);    // Use the auth router for authentication routes

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

