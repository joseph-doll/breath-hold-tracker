const express = require('express');
const router = express.Router();
const BreathHold = require('../models/breathHold');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const { breathholdSchema } = require('../schemas.js');

const validateBreathhold = (req, res, next) => {
    const { error } = breathholdSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

router.get('/', async(req, res) => {
    const breathholds = await BreathHold.find({});
    res.render('breathholds/index', { breathholds });
});

router.get('/new', (req, res) => {
    res.render('breathholds/new');
});

router.post('/', validateBreathhold, catchAsync(async (req, res, next) => {
    const breathhold = new BreathHold(req.body.breathhold);
    await breathhold.save();
    res.redirect(`breathholds/${breathhold._id}`);
}));

router.get('/:id', catchAsync(async (req, res) => {
    const breathhold = await BreathHold.findById(req.params.id);
    res.render('breathholds/show', { breathhold });
}));

router.get('/:id/edit', catchAsync(async (req, res) => {
    const breathhold = await BreathHold.findById(req.params.id);
    res.render('breathholds/edit', { breathhold });
}));

router.put('/:id', validateBreathhold, catchAsync(async (req, res) => {
    const { id } = req.params;
    const breathhold = await BreathHold.findByIdAndUpdate(id, {
        ...req.body.breathhold,
    });
    await breathhold.save();
    res.redirect(`/breathholds/${breathhold._id}`);
}));

router.delete('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    await BreathHold.findByIdAndDelete(id);
    res.redirect('/breathholds');
}));

module.exports = router;