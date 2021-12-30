const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateBreathhold } = require('../middleware');
const breathholds = require('../controllers/breathholds');

router.route('/')
    .get(catchAsync(breathholds.index))
    .post(isLoggedIn, validateBreathhold, catchAsync(breathholds.createBreathhold));

router.get('/new', isLoggedIn, breathholds.renderNewForm);

router.route('/:id')
    .get(catchAsync(breathholds.showBreathhold))
    .put(isLoggedIn, isAuthor, validateBreathhold, catchAsync(breathholds.updateBreathhold))
    .delete(isLoggedIn, isAuthor, catchAsync(breathholds.deleteBreathhold));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(breathholds.renderEditForm));

module.exports = router;






