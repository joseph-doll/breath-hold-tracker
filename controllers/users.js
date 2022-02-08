const User = require('../models/user');
const BreathHold = require('../models/breathHold');
const { cloudinary } = require('../cloudinary');

module.exports.renderRegister = (req, res) => {
  res.render('users/register');
};

module.exports.register = async (req, res, next) => {
  try {
    const { email, username, password, name } = req.body;
    const user = new User({ email, username, name });
    user.following.push(username);
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash(
        'success',
        `Welcome to Hold It ${req.body.name.split(' ')[0]}!`
      );
      res.redirect('/breathholds');
    });
  } catch (e) {
    if (e.code === 11000) {
      req.flash(
        'error',
        'A user with that email address has already been registered.'
      );
    } else {
      req.flash('error', e.message);
    }
    res.redirect('register');
  }
};

module.exports.renderLogin = (req, res) => {
  res.render('users/login');
};

module.exports.login = (req, res) => {
  const { name } = req.user;
  req.flash('success', `Good luck with your holds ${name.split(' ')[0]}!`);
  const redirectUrl = req.session.returnTo || '/breathholds/following';
  delete req.session.returnTo;
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
  const { name } = req.user;
  req.logout();
  req.flash('success', `See ya next time ${name.split(' ')[0]}!`);
  res.redirect('/');
};

module.exports.profile = (req, res) => {
  //get last 5 hold avg here
  res.render('users/profile');
};

module.exports.editProfile = (req, res) => {
  res.render('users/profileEdit');
};

module.exports.updateProfile = async (req, res) => {
  try {
    const { id, username } = req.user;
    const oldIcon = req.user.iconFilename;
    let { isPrivate, name } = req.body.user;
    isPrivate === 'true' ? (isPrivate = true) : (isPrivate = false);
    if (!req.file) {
      await BreathHold.updateMany(
        { username: username },
        { isPrivate: isPrivate, name: name }
      );
      await User.findByIdAndUpdate(id, {
        isPrivate: isPrivate,
        name: name,
      });
    } else {
      const { path, filename } = req.file;
      if (!oldIcon == '') {
        await cloudinary.uploader.destroy(oldIcon);
      }
      await BreathHold.updateMany(
        { username: username },
        { isPrivate: isPrivate, name: name, icon: path }
      );
      await User.findByIdAndUpdate(id, {
        isPrivate: isPrivate,
        name: name,
        icon: path,
        iconFilename: filename,
      });
    }
    res.redirect('/profile');
  } catch (err) {
    req.flash('error', err.message);
    res.redirect('/profile');
  }
};
