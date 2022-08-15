import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    bio: {
        type: String,
    },
    avatar: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    articles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Article'
        }
    ]
})

const User = mongoose.model('User', userSchema)

export default User