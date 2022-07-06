require('dotenv').config();
const express = require('express');
const app = express();
const ngrok = require('ngrok');


app.get('/', (req, res) => {
    res.send('Hello World I am running locally');
});

const server = app.listen(8080, () => {
    console.log('Running at 8080');
});

ngrok.connect({
    proto : 'http',
    addr : process.env.PORT,
}, (err, url) => {
    if (err) {
        console.error('Error while connecting Ngrok',err);
        return new Error('Ngrok Failed');
    }
});