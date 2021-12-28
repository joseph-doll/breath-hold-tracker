const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BreathHoldSchema = new Schema({
    name: String,
    duration: Number,
    type: String,
    orifice: String,
    position: String,
    underInfluence: {
        type: String, 
        default: 'no',
    },
    createdAt: {
        type: Date, 
        default: Date.now,
        required: true,
    }
});

module.exports = mongoose.model('Breathhold', BreathHoldSchema);