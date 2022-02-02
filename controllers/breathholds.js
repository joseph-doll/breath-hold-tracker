const { db, findByIdAndUpdate } = require('../models/breathHold');
const BreathHold = require('../models/breathHold');
const User = require('../models/user');

module.exports.index = async (req, res) => {
  const breathholds = await BreathHold.find({}).sort({ createdAt: -1 });
  if (req.user === undefined) {
    const isFollowing = [];
    res.render('breathholds/index', { breathholds, isFollowing });
  } else {
    const isFollowing = req.user.following;
    res.render('breathholds/index', { breathholds, isFollowing });
  }
};

module.exports.following = async (req, res) => {
  const breathholds = await BreathHold.find({}).sort({ createdAt: -1 });
  const isFollowing = req.user.following;
  res.render('breathholds/following', { breathholds, isFollowing });
};

module.exports.timer = (req, res) => {
  res.render('breathholds/timer');
};

module.exports.createTimedHold = async (req, res) => {
  //updates User
  const { duration } = req.body.breathhold;
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { prevHold: duration });
  //creates new hold
  const breathhold = new BreathHold(req.body.breathhold);
  breathhold.name = req.user.name;
  breathhold.author = req.user._id;
  breathhold.prevHold = req.user.prevHold;
  //updates User RecordHold with new record if there is one
  const prevRecord = req.user.recordHold;
  function calculateRecord(duration, record) {
    if (duration < record) {
      return record;
    } else {
      return duration;
    }
  }
  const updatedRecord = calculateRecord(duration, prevRecord);
  //updates recordHold and prevRecord on current Hold
  breathhold.recordHold = updatedRecord;
  breathhold.prevRecord = prevRecord;
  //updates total holds
  let { totalHolds } = req.user;
  totalHolds += 1;
  breathhold.holdNumber = totalHolds;
  //updates sum of hold seconds
  let { sumHoldSeconds } = req.user;
  sumHoldSeconds += breathhold.duration;
  //updates avgerages
  breathhold.prevAvg = req.user.avgHold; //updates current Hold with User's previous average
  avgResult = sumHoldSeconds / totalHolds;
  avgHold = avgResult.toFixed();
  breathhold.currentAvg = avgHold;
  breathholdAverage =
    (Math.abs(breathhold.duration - breathhold.prevAvg) / breathhold.prevAvg) *
    100;
  breathhold.avgDiff = breathholdAverage.toFixed();
  //end
  await User.findByIdAndUpdate(_id, {
    recordHold: updatedRecord,
    totalHolds: totalHolds,
    sumHoldSeconds: sumHoldSeconds,
    avgHold: avgHold,
  });
  breathhold.username = req.user.username;
  await breathhold.save();
  res.redirect('/breathholds');
};

module.exports.showBreathhold = async (req, res) => {
  const breathhold = await BreathHold.findById(req.params.id);
  if (!breathhold) {
    req.flash('error', 'Cannot find that breathhold.');
    return res.redirect('/breathholds');
  }
  res.render('breathholds/show', { breathhold });
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const breathhold = await BreathHold.findById(id);
  if (!breathhold) {
    req.flash('error', 'Cannot find that breathhold.');
    return res.redirect('/breathholds');
  }
  res.render('breathholds/edit', { breathhold });
};

module.exports.updateBreathhold = async (req, res) => {
  const { id } = req.params;
  const breathhold = await BreathHold.findByIdAndUpdate(id, {
    ...req.body.breathhold,
  });
  await breathhold.save();
  req.flash('success', 'Successfully modified hold.');
  res.redirect(`/breathholds/${breathhold._id}`);
};

module.exports.deleteBreathhold = async (req, res) => {
  const { id } = req.params;
  await BreathHold.findByIdAndDelete(id);
  req.flash('success', 'Successfully deleted hold.');
  res.redirect('/breathholds');
};
