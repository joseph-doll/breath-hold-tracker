const { breathholdSchema } = require('./schemas.js');
const BreathHold = require('./models/breathHold');
const ExpressError = require('./utils/ExpressError');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be signed in.');
        return res.redirect('/login');
    }
    next();
};

module.exports.validateBreathhold = (req, res, next) => {
    const { error } = breathholdSchema.validate(req.body);
    if (error) {
        const msg = error.details.map((el) => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
};

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const breathhold = await BreathHold.findById(id);
    if (!breathhold.author.equals(req.user._id)) {
        req.flash(
            'error',
            'Access Denied. You do not have permission to do that.'
        );
        return res.redirect(`/breathholds/${id}`);
    }
    next();
};
