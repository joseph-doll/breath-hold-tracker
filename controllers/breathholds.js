const { db, findByIdAndUpdate } = require('../models/breathHold');
const BreathHold = require('../models/breathHold');
const User = require('../models/user');

module.exports.index = async(req, res) => {
    const breathholds = await BreathHold.find({}).sort({ createdAt: -1 });
    //add middleware for stat display
    res.render('breathholds/index', { breathholds });
};

module.exports.timer = (req, res) => {  
    const { prevHold } = req.user;
    res.render('breathholds/timer');
};

module.exports.createTimedHold = async (req, res) => {
    //updates previous hold on user
    const { duration } = req.body.breathhold;
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { prevHold: duration });
    //creates new hold
    const breathhold = new BreathHold(req.body.breathhold);
    breathhold.name = req.user.name;
    breathhold.author = req.user._id;
    breathhold.prevHold = req.user.prevHold;
    //logic to get the change in percentage between prevHold and currentHold
    const result = Math.abs(breathhold.duration - breathhold.prevHold) / breathhold.prevHold * 100;
    breathhold.holdChange = result.toFixed();

    //updates User RecordHold
    const prevRecord = req.user.recordHold;
    function calculateRecord(duration, record) {
        if (duration<record) {
            return record
        } else {
            return duration
        }
    }
    const updatedRecord = calculateRecord(duration, prevRecord);
    breathhold.recordHold = updatedRecord;

    breathhold.prevRecord = prevRecord;
    //start avgHold difference logic

    //avgHold, totalHolds, sumHoldSeconds
    //updates total holds
    let { totalHolds }  = req.user;
    totalHolds += 1;
    //updates sum of hold seconds
    let { sumHoldSeconds } = req.user;
    sumHoldSeconds += breathhold.duration;

    //updates avgerage Hold
    let { avgHold } = req.user;
    avgResult = sumHoldSeconds/totalHolds;
    avgHold = avgResult.toFixed();
    //end 

    breathhold.currentAvg = avgHold;

    breathhold.avgDiff = Math.abs(breathhold.duration - breathhold.currentAvg) / breathhold.currentAvg * 100;
 

    await User.findByIdAndUpdate(_id, { 
        recordHold: updatedRecord,
        totalHolds: totalHolds,
        sumHoldSeconds: sumHoldSeconds,
        avgHold: avgHold,
    });

    await breathhold.save();
    res.redirect('/breathholds');
}

// module.exports.renderNewForm = async (req, res) => {
//     const { name } = req.user;
//     console.log(req.user)
//     res.render('breathholds/new', { name: name });
// };

// module.exports.createBreathhold = async (req, res, next) => {
//     const breathhold = new BreathHold(req.body.breathhold);
//     breathhold.name = req.user.name;
//     breathhold.author = req.user._id;
//     await breathhold.save();
//     if(breathhold.duration === 69) {
//         req.flash('success', 'Nice ;)'); //easter egg
//         res.redirect('/breathholds');
//     } else {
//         req.flash('success', 'Successfully created a new hold.');
//         res.redirect('/breathholds');
//     };
// };

module.exports.showBreathhold = async (req, res) => {
    const breathhold = await BreathHold.findById(req.params.id);
    if(!breathhold){
        req.flash('error', 'Cannot find that breathhold.');
        return res.redirect('/breathholds');
    } 
    res.render('breathholds/show', { breathhold });
};

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const breathhold = await BreathHold.findById(id);
    if(!breathhold){
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