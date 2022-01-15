const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BreathHoldSchema = new Schema({
    name: String,
    holdNumber: {
        type: Number,
        default: 0,
    },
    duration: Number,
    comments: String,
    notes: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    prevHold: Number,
    prevRecord: Number,
    recordHold: Number,
    currentAvg: Number,
    prevAvg: Number,
    avgDiff: {
        type: Number,
        default: 0,
    },
});

module.exports = mongoose.model('Breathhold', BreathHoldSchema);