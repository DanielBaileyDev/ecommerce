const product = require('../Models/product');

module.exports = {
    getFeatured: async (req, res) => {
        try {
            const products = await product.find({ featured: true });
            const loggedIn = req.user ? true : false;
            res.render('index.ejs', {
                products: products,
                loggedIn: loggedIn,
                username: loggedIn ? req.user.username : null,
                url: req.baseUrl,
            });
        } catch (err) {
            console.log(err);
        }
    }
};