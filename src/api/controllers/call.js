const VoiceResponse = require('twilio').twiml.VoiceResponse;

exports.incomingCall = function incomingCall() {
  const voiceResponse = new VoiceResponse();

  const gather = voiceResponse.gather({
    action: '/call/menu',
    numDigits: '1',
    method: 'POST',
  });

  gather.say(
    'Welcome to Maleeka`s IRV System' +
    'Please press 1 for call forwarding' +
    'Press 2 for leaving a voice mail',
    {loop: 3}
  );

  return voiceResponse.toString();
};

exports.menu = function menu(digit) {
  const optionActions = {
    '1': callForwarding,
    '2': voiceMailing,
  };

  return (optionActions[digit])
    ? optionActions[digit]()
    : redirectWelcome();
};

exports.callForwarding = function callForwarding(){
    const twiml = new VoiceResponse();
    twiml.dial('+33123456789');
    
    return twiml.toString();
}

function redirectWelcome() {
  const twiml = new VoiceResponse();

  twiml.say('Returning to the main menu', {
    voice: 'alice',
    language: 'en-GB',
  });

  twiml.redirect('/call/incoming');

  return twiml.toString();
}