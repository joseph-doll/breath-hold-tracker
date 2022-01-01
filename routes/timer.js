const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware');
const timers = require('../controllers/timer');

router.route('/')
    .get(isLoggedIn, timers.renderForm);

module.exports = router;