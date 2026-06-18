import Messages from '../models/messages.js';
import User from '../models/User.js';
import { io, getReceiverSocketId } from '../lib/socket.js';
import cloudinary from '../lib/cloudinary.js';

export const getContacts = async (req, res) => {
    try {
        const loggedInuserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInuserId } }).select('-password');
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error(`Error in getting contacts: ${error.message}`);
        res.status(500).json({ message: "Server error" });
    }
};

export const getChatPartners = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const messages = await Messages.find({
            $or:
                [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }]
        });

        const chatPartnerIds = [
            ...new Set(
            messages.map(msg => msg.senderId.toString() === loggedInUserId.toString()
                ? msg.receiverId.toString()
                : msg.senderId.toString())
            )
        ];
        const chatPartners = await User.find({ _id: { $in:chatPartnerIds} }).select('-password');
        res.status(200).json(chatPartners)
    } catch (error) {
        console.error(`Error in getting chat partners: ${error.message}`);
        res.status(500).json({ message: "Server error" });
    }
};

export const getMessagesByUserId = async (req, res) => {
    try {
        const myid = req.user._id;
        const { id: otherUserId } = req.params;
        const messages = await Messages.find({
            $or: [
                { senderId: myid, receiverId: otherUserId },
                { senderId: otherUserId, receiverId: myid }
            ]
        });
        res.status(200).json(messages);
    } catch (error) {
        console.error(`Error in getting messages: ${error.message}`);
        res.status(500).json({ message: "Server error" });
    }
};

export const sendMessage = async (req, res) => {
    try {
        const senderId = req.user._id;
        const { id: receiverId } = req.params;
        const { text, image } = req.body;

        if ((!text || !text.trim()) && !image) {
            return res.status(400).json({ message: "Message text or image is required" });
        }
        if (receiverId === senderId.toString()) {   //here receiverid is string but senderid is objectid so we need to convert it to string for comparison
            return res.status(400).json({ message: "Cannot send message to yourself" });
        }
        const receiverExists = await User.findById(receiverId);
        if (!receiverExists) {
            return res.status(404).json({ message: "Receiver not found" });
        }

        let imageURL;
        if (image) {
            // upload Base64 image to Cloudinary
            const uploadimage = await cloudinary.uploader.upload(image);
            imageURL = uploadimage.secure_url;
        }

        const newMessage = new Messages({
            senderId,
            receiverId,
            text,
            image: imageURL || null,
        });
        await newMessage.save();
        
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);
    } catch (error) {
        console.error(`Error in sending message: ${error.message}`);
        console.error("Stack trace:", error.stack);
        res.status(500).json({ message: "Server error: " + error.message });
    }
};
