// Dependencies \\
const mongoose = require('mongoose')
require('dotenv').config()
const connectionString = process.env.MONGODBURI
mongoose.set('strictQuery', false)

// MongoDB Connect \\
mongoose.connect(
    connectionString,
    { useNewUrlParser: true, useUnifiedTopology: true }
);

// Connection Status \\
mongoose.connection.on('connected', () => {
    console.log('mongoose connected to ', connectionString);
});

mongoose.connection.on('disconnected', () => {
    console.log('mongoose disconnected to ', connectionString);
});

mongoose.connection.on('error', (error) => {
    console.log('mongoose error ', error);
});


// Accessing Models \\
module.exports.Nft = require("./nft.js");
module.exports.User = require("./user.js");
module.exports.Note = require("./note.js");
module.exports.Crypto = require("./crypto.js");

