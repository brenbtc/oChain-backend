const mongoose = require('mongoose');
// const Schema = mongoose.Schema

const nftSchema = new mongoose.Schema(
    {
        cluster: {
            type: String,
            required: true
        },

        nftid: {
            type: Number,
            required: true
        },

        price: {
            type: Number,
            required: true
        },

        floor: {
            type: Number,
        },
        note_id: [{
            type: mongoose.ObjectId,
            ref: 'Note'
        }]

    }
)

const Nft = mongoose.model('Nft', nftSchema);
module.exports = Nft;
