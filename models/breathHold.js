const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BreathHoldSchema = new Schema({
    name: String,
    duration: Number,
    type: String,
    orifice: String,
    position: String,
    underInfluence: String,
    createdAt: {
        type: Date,
        default: Date.now,
    }
    // name: {
    //     type: String,
    //     required: true,
    // },
    // duration: {
    //     type: Number,
    //     required: true,
    // },
    // type: {
    //     type: String,
    //     required: true,
    // },
    // orifice: {
    //     type: String,
    //     required: true,
    // },
    // position: {
    //     type: String,
    //     required: true,
    // },
    // underInfluence: {
    //     type: String, 
    //     default: 'no',
    // },
    // createdAt: {
    //     type: Date, 
    //     default: Date.now,
    //     required: true,
    // },
});

module.exports = mongoose.model('Breathhold', BreathHoldSchema);