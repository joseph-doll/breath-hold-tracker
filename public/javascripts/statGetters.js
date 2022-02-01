module.exports.getLastHold;

author = req.user._id;
const found = await BreathHold.find({ author: author })
    .sort({ createdAt: -1 })
    .limit(1);
const duration = found[0].duration;
