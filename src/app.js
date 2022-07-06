require('dotenv').config();
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World I am running locally');
});

app.listen(process.env.PORT || 8080, () => {
    console.log('Running at 8080');
});
