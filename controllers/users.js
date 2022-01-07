const User = require('../models/user');

module.exports.renderRegister = (req, res) => {
    res.render('users/register');
};

module.exports.register = async (req, res, next) => {
    try {
        const { email, username, password, name } = req.body;
        const user = new User({ email, username, name });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if(err) return next(err);
            req.flash('success', `Welcome to Breath Hold Tracker ${req.body.name}!`);
            res.redirect('/breathholds');
        });
    } catch(e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
};

module.exports.renderLogin = (req, res) => {
    res.render('users/login');
};

module.exports.login = (req, res) => {
    const { name } = req.user;
    req.flash('success', `Good luck with your holds ${ name }!`);
    const redirectUrl = req.session.returnTo || '/breathholds';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
    const { name } = req.user;
    req.logout();
    req.flash('success', `See ya next time ${name}!`);
    res.redirect('/login');
};