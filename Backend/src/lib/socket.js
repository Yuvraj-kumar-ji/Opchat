import { Server } from "socket.io";
import http from "http";
import {ENV} from "./env.js";
import express from "express";
import { socketAuthMiddleware } from "../middlewares/socketAuth(Mw).js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [ENV.mainURL],
    credentials: true,
  },
});

// apply authentication middleware to all socket connections
io.use(socketAuthMiddleware);

// this is for storing online users
const userSocketMap = {}; // {userId:socketId}

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

io.on("connection", (socket) => {
  console.log("A user connected:", socket.user.username);

  const userId = socket.userId;
  userSocketMap[userId] = socket.id;

  // io.emit() is used to send events to all connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // with socket.on we listen for events from clients
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.user.username);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };