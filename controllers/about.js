module.exports = {
    getPage: async (req, res) => {
        try {
            const loggedIn = req.user ? true : false;
            res.render('about.ejs', {
                loggedIn: loggedIn,
                username: loggedIn ? req.user.username : null,
                url: req.baseUrl,
                role: loggedIn ? req.user.role : null
            });
        } catch (err) {
            console.log(err);
        }
    }
};