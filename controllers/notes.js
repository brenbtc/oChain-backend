const express = require('express');
const router = express.Router()
const db = require('../models');
const jwt = require('jwt-simple');
const config = require('../config/config')


// Only lets logged user Create \\
function isAuthenticated(req, res, next){
    if(req.headers.authorization){
        next()
    } else {
        res.sendStatus(401)
    }
}


// Creates a Note \\
router.post('/', isAuthenticated, async (req, res) => {
    const createdNote = await db.Note.create(req.body)
    const token = req.headers.authorization
    const decoded = jwt.decode(token, config.jwtSecret)
    createdNote.user = decoded.id
    createdNote.save()
    res.json(createdNote)
})


// Index Route \\
router.get('/', async (req, res) => {
    const allNotes = await db.Note.find({}).populate('user')
    res.json(allNotes)
})

// Show Note \\
router.get('/:id', async (req, res) => {
    const foundNote = await db.Note.findById(req.params.id).populate('user')
    res.json(foundNote)
})

// Update Note\\
router.put('/:id', isAuthenticated, async (req, res) => {
    const updatedNote = await db.Note.findByIdAndUpdate(req.body.id
        , req.body, {new: true})
    res.json(updatedNote)
})


// Delete Note \\
router.delete('/:id', isAuthenticated, async (req, res) => {
    await db.Note.findByIdAndDelete(req.params.id)
    res.sendStatus(200)
})

module.exports = router