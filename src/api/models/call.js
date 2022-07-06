var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var callSchema = new Schema({
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
    status: {
        type: String,
        required: true
    }

}, { timestamps: { createdAt: 'placeTime' } });
module.exports = mongoose.model('Call', callSchema);

