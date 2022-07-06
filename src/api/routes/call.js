const express = require('express');

const router = express.Router();
const { incomingCall, menu} = require('../controllers/call');

router.post('/incoming', incomingCall);
router.post('/menu', menu);

module.exports = router;