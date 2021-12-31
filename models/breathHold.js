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
        default: new Date(),
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});

module.exports = mongoose.model('Breathhold', BreathHoldSchema);