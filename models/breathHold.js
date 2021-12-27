const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BreathHoldSchema = new Schema({
    name: String,
    duration: Number,
    type: String,
    orifice: String,
    position: String,
    underInfluence: String,
});

module.exports = mongoose.model('Breathhold', BreathHoldSchema);