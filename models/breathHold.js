const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BreathHoldSchema = new Schema({
    name: String,
    duration: Number,
    comments: String,
    notes: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});

module.exports = mongoose.model('Breathhold', BreathHoldSchema);