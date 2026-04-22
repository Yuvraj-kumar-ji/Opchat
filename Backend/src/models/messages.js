import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        receiver: {
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
    { timestamp: true }
);

const Messages = mongoose.model('Messages', messageSchema);

export default Messages;