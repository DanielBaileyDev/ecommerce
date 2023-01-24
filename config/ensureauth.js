module.exports = {
    ensureAuth: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.redirect('/');
        }
    },
    hasPermission: (req, res, next) => {
        if (req.user.role === 'Admin' || req.user.role === 'Reader') {
            return next();
        } else {
            res.redirect('/');
        }
    },
    isAdmin: (req, res, next) => {
        if (req.user.role === 'Admin') {
            return next();
        } else {
            res.redirect('/');
        }
    }
}