import express from 'express';
import {ENV} from './lib/env.js';
import path from 'path';
import cookieparser from 'cookie-parser';
import cors from 'cors';


const PORT = ENV.PORT;

// Getting the file from router
import authRouter from './routers/auth(R).js';  
import messagesRouter from './routers/messages(R).js';  
// Import the function to connect to the database
import connectDB from './lib/db.js';    
import { app, server } from './lib/socket.js';    // Import the Socket.IO instance from the socket.js file

const app = express();
const __dirname = path.resolve();    // Get the current directory path
app.use(express.json({limit : "5mb"}));    // Middleware to parse JSON request bodies
app.use(cors({origin: ENV.mainURL, credentials: true}));    // Enable CORS for the specified origin and allow credentials
app.use(cookieparser());    // Middleware to parse cookies

app.use('/api/auth', authRouter);    // Use the auth router for authentication routes
app.use('/api/messages', messagesRouter);    // Use the messages router for message-related routes

//make ready for production
if(ENV.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));    // Serve static files from the React build directory
  app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));    // Send the index.html file for any unmatched routes
  });
}
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB();    // Connect to the database when the server starts
});

