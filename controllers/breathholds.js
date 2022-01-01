const BreathHold = require('../models/breathHold');

module.exports.index = async(req, res) => {
    const breathholds = await BreathHold.find({});
    res.render('breathholds/index', { breathholds });
};

module.exports.timer = (req, res) => {  
    res.render('breathholds/timer');
};

module.exports.renderNewForm = (req, res) => {
    const { name } = req.user;
    res.render('breathholds/new', { name: name });
};

module.exports.createBreathhold = async (req, res, next) => {
    const breathhold = new BreathHold(req.body.breathhold);
    breathhold.author = req.user._id;
    await breathhold.save();
    if(breathhold.duration === 69) {
        req.flash('success', 'Nice ;)'); //easter egg
        res.redirect(`breathholds/${breathhold._id}`);
    } else {
        req.flash('success', 'Successfully created a new hold.');
        res.redirect(`breathholds/${breathhold._id}`);
    };
};

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