const express = require('express');
const router = express.Router();
const BreathHold = require('../models/breathHold');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateBreathhold } = require('../middleware');



router.get('/', async(req, res) => {
    const breathholds = await BreathHold.find({});
    res.render('breathholds/index', { breathholds });
});

router.get('/new', isLoggedIn, (req, res) => {
    const { name } = req.user;
    res.render('breathholds/new', { name: name });
});

router.post('/', isLoggedIn, validateBreathhold, catchAsync(async (req, res, next) => {
    const breathhold = new BreathHold(req.body.breathhold);
    breathhold.author = req.user._id;
    await breathhold.save();
    req.flash('success', 'Successfully created a new hold.');
    res.redirect(`breathholds/${breathhold._id}`);
}));

router.get('/:id', catchAsync(async (req, res) => {
    const breathhold = await BreathHold.findById(req.params.id);
    if(!breathhold){
        req.flash('error', 'Cannot find that breathhold.');
        return res.redirect('/breathholds');
    } 
    res.render('breathholds/show', { breathhold });
}));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
    const { id } = req.params;
    const breathhold = await BreathHold.findById(id);
    if(!breathhold){
        req.flash('error', 'Cannot find that breathhold.');
        return res.redirect('/breathholds');
    }
    res.render('breathholds/edit', { breathhold });
}));

router.put('/:id', isLoggedIn, isAuthor, validateBreathhold, catchAsync(async (req, res) => {
    const { id } = req.params;
    const breathhold = await BreathHold.findByIdAndUpdate(id, {
        ...req.body.breathhold,
    });
    await breathhold.save();
    req.flash('success', 'Successfully modified hold.');
    res.redirect(`/breathholds/${breathhold._id}`);
}));

router.delete('/:id', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
    const { id } = req.params;
    await BreathHold.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted hold.');
    res.redirect('/breathholds');
}));

module.exports = router;