const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

module.exports = (passport) => {
    passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback: true },
        (req, email, password, done) => {
            User.findOne({ email: email.toLowerCase() }, (err, user) => {
                if (err) {
                    req.flash('fail', { msg: err });
                    return done(err);
                }
                if (!user) {
                    req.flash('fail', { msg: 'Invalid email or password' });
                    return done(null, false);
                }
                user.comparePassword(password, (err, isMatch) => {
                    if (err) {
                        req.flash('fail', { msg: err });
                        return done(err);
                    }
                    if (isMatch) {
                        return done(null, user);
                    }
                    req.flash('fail', { msg: 'Invalid email or password' });
                    return done(null, false, { msg: 'Invalid email or password' });
                });
            });
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user));
    });
}
