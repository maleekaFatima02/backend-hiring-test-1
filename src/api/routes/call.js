const express = require('express');

const router = express.Router();
const { incomingCall, menu, saveCall, callForwarding, voiceMailing, saveVoiceMail} = require('../controllers/call');

router.post('/incoming', incomingCall);
router.post('/menu', menu);
router.post('/save', saveCall);
router.post('/forwarding', callForwarding);
router.post('/voiceMail', voiceMailing)
router.post('/saveVoiceMail', saveVoiceMail)

module.exports = router;