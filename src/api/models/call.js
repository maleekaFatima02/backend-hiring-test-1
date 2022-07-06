var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var callSchema = new Schema({
    sid: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    voiceMail:{
        type: Boolean,
        default:false,
        required: true
    },
    voiceMailURL:{
        type: String
    },
    status: {
        type: String,
        required: true
    }

}, { timestamps: true });
module.exports = mongoose.model('Call', callSchema);

