module.exports = {
    getPage: async (req, res) => {
        try {
            const loggedIn = req.user ? true : false;
            res.render('paymentstatus.ejs', {
                loggedIn: loggedIn,
                username: loggedIn ? req.user.username : null,
                url: req.baseUrl,
                role: loggedIn ? req.user.role : null,
                purchaseID: req.query.payment_intent
            });
        } catch (err) {
            console.log(err);
        }
    }
};