// Dependencies \\
const methodOverride = require('method-override');
const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();
require('./models');
const PORT = process.env.PORT;


const app = express();

// Access Controllers \\
const userCtrl = require('./controllers/users');
const noteCtrl = require('./controllers/notes');
// const nftCtrl = require('./controllers/nfts');
const cryptoCtrl = require('./controllers/cryptos');



// Middleware \\
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(methodOverride('_method'))

// Controllers (Routes) \\
app.use('/user', userCtrl);
app.use('/note', noteCtrl);
app.use('/crypto', cryptoCtrl);
// app.use('/nft', nftCtrl);



// Listener \\
app.listen(PORT, () => {
    console.log(`Listening on Port: ${PORT}`)
})