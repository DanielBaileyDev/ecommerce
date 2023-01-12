const LocalStrategy = require('passport-local').Strategy;
const User = require('../Models/user');

module.exports = function (passport) {
    passport.use(new LocalStrategy({ usernameField: 'email' },
        (email, password, done) => {
            User.findOne({ email: email.toLowerCase() }, (err, user) => {
                if (err) { return done(err); }
                if (!user) { return done(null, false); }
                user.comparePassword(password, (err, isMatch) => {
                    if (err) { return done(err) }
                    if (isMatch) {
                        return done(null, user)
                    }
                    return done(null, false, { msg: 'Invalid email or password.' })
                });
                return done(null, user);
            });
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user))
    })
}