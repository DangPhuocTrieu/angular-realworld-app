import express from 'express'
import argon2 from 'argon2'
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

// EDIT USER
router.put('/:id', async (req, res) => {
    try {
        let newData;
        const usernameExtist = await User.findOne({ username: req.body.username.trim() })
        const emailExtist = await User.findOne({ email: req.body.email.trim() })

        if(usernameExtist && usernameExtist._id != req.params._id) {
            return res.status(401).json({ 
                success: false, 
                message: 'Username must be unique', 
            })
        }

        if(emailExtist && emailExtist._id != req.params._id) {
            return res.status(401).json({ 
                success: false, 
                message: 'Email must be unique', 
            })
        }

        if(req.body.newPassword) {
            const hashNewPassword = await argon2.hash(req.body.newPassword)
            newData =  { ...req.body, password: hashNewPassword }
        }
        else {
            newData =  { ...req.body }
        }

        const userUpdated = await User.findOneAndUpdate(
            { _id: req.params.id },
            { ...newData },
            { new: true }
        )

        const { password, __v, ...others } = userUpdated._doc
        
        res.status(200).json({ 
            success: true, 
            message: 'Update user successfully!', 
            data: others
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
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