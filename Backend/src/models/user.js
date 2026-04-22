import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        minlength: 6,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },

    profilePic: {
        type: String,
        default: '',
    },
},
 { timestamps: true });   // Automatically add createdAt and updatedAt fields

const User = mongoose.model('User', userSchema);

export default User;