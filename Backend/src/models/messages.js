import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        text: {
            type: String,
            trim: true,
            maxlength: 2000
        },
        image: {
            type: String,
            default: null
        },
    }, 
    { timestamps: true }
);

const Messages = mongoose.models.Messages || mongoose.model('Messages', messageSchema);

export default Messages;