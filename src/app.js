require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const callRoutes = require('./api/routes/call');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World I am running locally');
});

app.get('/call', callRoutes);

app.listen(process.env.PORT || 8080, () => {
    console.log('Running at 8080');
});

mongoose.connect(process.env.MONGOOSE).then(
    () => { 
        console.log('Connected to DB!');
    },
    err => { 
        logError(err);
     }
  );