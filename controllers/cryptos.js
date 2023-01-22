const express = require('express');
const router = express.Router();
const db = require('../models');
const Crypto = db.Crypto;


// show route
router.get('/api/:id', async (req, res) => {
    const showCrypto = await Crypto.findById(req.params.id).populate('user')
    res.json(showCrypto)
})





module.exports = router