const express = require('express');
const router = express.Router()
const db = require('../models');
const jwt = require('jwt-simple');
const config = require('../config/config')
const argon2 = require('argon2')


// Signup Route \\
router.post('/signup', async (req, res) => {

    const foundUser = await db.User.findOne({ username: req.body.username })
    if(!foundUser){
        const createdUser = await db.User.create({
            _id: req.body._id,
            username: req.body.username,
            //use argon2 to hash password
            password: await argon2.hash(req.body.password)
        }
        )
        console.log("Hashed Password: " + createdUser.password)
        const payload = {id: createdUser._id}
        const token = jwt.encode(payload, config.jwtSecret)
        res.json({
            user: createdUser,
            token: token
        })
    } else {
        res.sendStatus(401)
    }
})

// Login Route \\
router.post('/login', async (req, res) => {
    try
    {
    const foundUser = await db.User.findOne({ username: req.body.username })
    //use argon2 to verify password
    if(foundUser && await argon2.verify(foundUser.password, req.body.password))
        {
        const payload = {id: foundUser._id}
        const token = jwt.encode(payload, config.jwtSecret)
        const userNotes = await db.Note.find({ user:foundUser._id })

        res.json({
            user: foundUser,
            token: token,
            notes: userNotes
        })
    } else {
        res.sendStatus(401)
    }
    } catch (error) {
        res.sendStatus(401)
    }
})



// Token Show \\
router.get('/token', async (req, res) => {
    const token = req.headers.authorization
    const decoded = jwt.decode(token, config.jwtSecret)
    const foundUser = await db.User.findById(decoded._id)
    const userNotes = await db.Note.find({ user:foundUser._id })
    res.json({
        user: foundUser,
        notes: userNotes
    })
})

module.exports = router