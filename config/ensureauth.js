module.exports = {
    ensureAuth: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        } else {
            req.flash('fail', { msg: 'Please login' });
            res.redirect('/');
        }
    },
    hasPermission: (req, res, next) => {
        if (req.user.role === 'Admin' || req.user.role === 'Reader') {
            return next();
        } else {
            req.flash('fail', { msg: 'Permission denied' });
            res.redirect('/');
        }
    },
    isAdmin: (req, res, next) => {
        if (req.user.role === 'Admin') {
            return next();
        } else {
            req.flash('fail', { msg: 'Permission denied' });
            res.status(200).json({ message: "failed" });
        }
    }
}