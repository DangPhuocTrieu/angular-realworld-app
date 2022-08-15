import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    tagList: [
        {
            type: String,
        }
    ],
    favoritesCount: {
        type: Number
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Article = mongoose.model('Article', articleSchema)

export default Article

