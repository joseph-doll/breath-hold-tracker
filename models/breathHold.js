const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BreathHoldSchema = new Schema({
    name: String,
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
    holdChange: Number,
    prevRecord: Number,
    recordHold: Number,
    currentAvg: Number,
    avgDiff: Number,
});

module.exports = mongoose.model('Breathhold', BreathHoldSchema);