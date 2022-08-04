import express from 'express'
import Article from '../models/Article.js'

const router = express.Router()

// GET ALL ARTICLES
router.get('/', async (req, res) => {
    try {
        const articles = await Article.find().populate('author', ['id', 'username', 'email', 'isAdmin'])

        res.status(200).json({ 
            success: true, 
            message: 'Get all articles successfully!', 
            data: articles
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
})

// GET ARTICLE
router.get('/:id', async (req, res) => {
    try {
        const article = await Article.findById(req.params.id).populate('author', ['id', 'username', 'email', 'isAdmin'])

        res.status(200).json({ 
            success: true, 
            message: 'Get article successfully!', 
            data: article
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
})


// ADD ARTICLE
router.post('/', async (req, res) => {
    try {
        const newArticle = new Article(req.body)
        const savedArticle = await newArticle.save()

        res.status(200).json({ 
            success: true, 
            message: 'Add article successfully!', 
            data: savedArticle
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
})

// DELETE ARTICLE
router.delete('/:id', async (req, res) => {
    try {
        await Article.findByIdAndDelete(req.params.id)

        res.status(200).json({
            success: true,
            message: 'Delete article successfully!',
         })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
})

export default router