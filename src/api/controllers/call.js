const Call = require('../models/call');
const moment = require('moment');
const VoiceResponse = require('twilio').twiml.VoiceResponse;

exports.callLog = async (req, res) => {
    try{
        let calls = await Call.find().sort({createdAt: -1});
        return res.render('callLog', {calls: calls, moment:moment});
    }
    catch(e){
        return res.json({
            error: e.message
        });
    }
};

exports.incomingCall = async (req, res) => {
    try {
        let call = new Call({
            sid: req.body.CallSid,
            to: req.body.To,
            from: req.body.From,
            duration: 0,
            status: req.body.CallStatus
        })
        await call.save();
        const twiml = new VoiceResponse();
        const gather = twiml.gather({
            action: '/call/menu',
            numDigits: '1',
            method: 'POST',
        });

        gather.say(
            ' Welcome to Maleeka`s IRV System.  ' +
            ' Please press 1 for call forwarding.  ' +
            ' Press 2 for leaving a voice mail.  ' + 
            '                   ', {
                loop: 3
            }
        );
        return res.send(twiml.toString());
    } catch (e) {
        return res.json({
            error: e.message
        });
    }
};

exports.menu = async (req, res) => {
    try {
        const twiml = new VoiceResponse();
        await Call.findOneAndUpdate({
            sid: req.body.CallSid
        }, {
            status: req.body.CallStatus
        });

        switch (req.body.Digits) {
            case '1':
                twiml.redirect('/call/forwarding');
                break;
            case '2':
                twiml.redirect('/call/voiceMail');
                break;
            default:
                twiml.say('Incorrect option. Ending Call.');
                twiml.redirect('/call/save');
        }
        return res.send(twiml.toString());
    } catch (e) {
        res.send(e.message);
        console.log(e.message)
    }
};

exports.callForwarding = (req, res) => {
    try {
        const twiml = new VoiceResponse();
        twiml.dial(process.env.FORWARDINGNUMBER);
        twiml.redirect('/call/save');
        return res.send(twiml.toString());
    } catch (e) {
        res.send(e.message);
        console.log(e.message)
    }
};

exports.saveCall = async (req, res) => {
    try {
        let call = await Call.findOne({sid:req.body.CallSid});
        const twiml = new VoiceResponse();
        twiml.say(" Your Call is saved.");
        twiml.hangup();
        await Call.findOneAndUpdate({
            sid: req.body.CallSid
        }, {
            status: 'Completed',
            duration: (Date.now() - new Date(call.createdAt))/1000
        });
        return res.send(twiml.toString());
    } catch (e) {
        console.log(e.message);
        res.send(e.message)
    }
}

exports.voiceMailing = (req, res) => {

    try {
        const twiml = new VoiceResponse();
        twiml.say('Record your voicemail for Maleeka. press # to end voicemail', {
            voice: 'alice'
        });

        twiml.record({
            playBeep: true,
            finishOnKey: "#",
            action: "/call/saveVoiceMail",
        });
        return res.send(twiml.toString());
    } catch (e) {
        console.log(e.message);
        res.send(e.message)
    }

}

exports.saveVoiceMail = async (req, res) => {
    try {
        const twiml = new VoiceResponse();
        twiml.say("Your VoiceMail is saved");
        twiml.hangup();
        await Call.findOneAndUpdate({
            sid: req.body.CallSid
        }, {
            voiceMail: true,
            duration: req.body.RecordingDuration,
            voiceMailURL: req.body.RecordingUrl,
            status: 'Completed'
        });
        return res.send(twiml.toString());
    } catch (e) {
        console.log(e.message);
        res.send(e.message)
    }
}