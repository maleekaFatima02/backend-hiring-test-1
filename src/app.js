require('dotenv').config();
const bodyParser = require('body-parser');
const ejs = require('ejs');
const express = require('express');
const mongoose = require('mongoose');
const callRoutes = require('./api/routes/call');
const {
    callLog
} = require('./api/controllers/call');
const app = express();

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', callLog);

app.use('/call', callRoutes);

app.listen(process.env.PORT || 8080, () => {
    console.log('Running at 8080');
});

mongoose.connect(process.env.MONGOOSE).then(
    () => {
        console.log('Connected to DB!');
    },
    err => {
        console.log(err.message);
    }
);