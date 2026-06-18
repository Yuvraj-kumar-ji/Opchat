import express from 'express';
import { getContacts, getChatPartners, getMessagesByUserId, sendMessage } from '../controllers/messages(C).js';
import { protectedRoute } from '../middlewares/authcheck(Mw).js';

const router = express.Router();

router.use(protectedRoute); // Apply the protectedRoute middleware to all routes in this router

router.get("/contacts", getContacts);
router.get("/chats", getChatPartners);
router.get("/:id", getMessagesByUserId);
router.post("/send/:id", sendMessage);

export default router;