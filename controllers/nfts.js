const express = require('express');
const router = express.Router()
const db = require('../models');


// show route
router.get('/:id', async (req, res) => {
    const showNft = await Nft.findById(req.params.id).populate('user')
    res.json(showNft)
})



module.exports = router