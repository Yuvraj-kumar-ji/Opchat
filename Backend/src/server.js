import express from 'express';
import { ENV } from './lib/env.js';
import cookieparser from 'cookie-parser';
import cors from 'cors';
import authRouter from './routers/auth(R).js';  
import messagesRouter from './routers/messages(R).js';  
import connectDB from './lib/db.js';    
import { app, server } from './lib/socket.js';

app.use(express.json({ limit: "5mb" }));
app.use(cors({
    origin: ENV.mainURL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(cookieparser());

app.use('/api/auth', authRouter);
app.use('/api/messages', messagesRouter);

server.listen(ENV.PORT, () => {
  console.log(`Server is running on http://localhost:${ENV.PORT}`);
  connectDB();
});