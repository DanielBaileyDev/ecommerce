module.exports = {
    ensureAuth: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        } else {
            req.flash('fail', { msg: 'Please login' });
            return res.redirect('/');
        }
    },
    hasPermission: (req, res, next) => {
        if (req.user.role === 'Admin' || req.user.role === 'Reader') {
            return next();
        } else {
            req.flash('fail', { msg: 'Permission denied' });
            return res.redirect('back');
        }
    },
    isAdmin: (req, res, next) => {
        if (req.user.role === 'Admin') {
            return next();
        } else {
            req.flash('fail', { msg: 'Permission denied' });
            return res.redirect('back');
        }
    }
}