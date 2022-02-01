const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true,
    },
    prevHold: {
        type: Number,
        default: 1,
    },
    recordHold: {
        type: Number,
        default: 1,
    },
    avgHold: {
        type: Number,
        default: 0,
    },
    totalHolds: {
        type: Number,
        default: 0,
    },
    sumHoldSeconds: {
        type: Number,
        default: 0,
    },
    following: {
        type: Array,
    }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
