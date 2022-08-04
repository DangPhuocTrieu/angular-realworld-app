import express from 'express'
import User from '../models/User.js'

const router = express.Router()

// GET ALL USERS
router.get('/', async (req, res) => {
    try {
        const users = await User.find()

        res.status(200).json({ 
            success: true, 
            message: 'Get all users successfully!', 
            data: users
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
})

// GET USER
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        res.status(200).json({ 
            success: true, 
            message: 'Get user successfully!', 
            data: user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
})


// ADD USER
router.post('/', async (req, res) => {
    try {
        const newUser = new User(req.body)
        const savedUser = await newUser.save()

        res.status(200).json({ 
            success: true, 
            message: 'Add user successfully!', 
            data: savedUser
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
})

// DELETE USER
router.delete('/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)

        res.status(200).json({
            success: true,
            message: 'Delete user successfully!',
         })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
})

export default router 