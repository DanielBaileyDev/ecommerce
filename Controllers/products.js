const product = require('../Models/product');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

function dollarsToCents(s) {
    return String(s).replace(/[^0-9]+/g, "");
}

module.exports = {
    getProducts: async (req, res) => {
        try {
            const products = await product.find();
            const loggedIn = req.user ? true : false;
            res.render('products.ejs', {
                products: products,
                loggedIn: loggedIn,
                username: loggedIn ? req.user.username : null,
                url: req.baseUrl,
                role: loggedIn ? req.user.role : null
            });
        } catch (err) {
            console.log(err);
        }
    },
    getProductPage: async (req, res) => {
        try {
            const products = await product.findOne({
                _id: req.params.id
            });
            const loggedIn = req.user ? true : false;
            res.render('productpage.ejs', {
                product: products,
                loggedIn: loggedIn,
                username: loggedIn ? req.user.username : null,
                url: req.baseUrl,
                role: loggedIn ? req.user.role : null,
                publicKey: process.env.STRIPE_PUBLISHABLE_KEY,
                stripeValue: products ? dollarsToCents(products.price) : null,
            });
        } catch (err) {
            console.log(err);
        }
    },
    postPayment: async (req, res) => {
        try {
            const products = await product.findOne({
                _id: req.params.id
            });
            if (products) {
                stripe.customers.create({
                    email: req.body.stripeEmail,
                    source: req.body.stripeToken,
                })
                    .then((customer) => {
                        return stripe.charges.create({
                            amount: dollarsToCents(products.price),
                            description: products.name,
                            currency: 'aud',
                            customer: customer.id
                        });
                    })
                    .then((_) => {
                        req.flash('success', { msg: 'Purchase successful' });
                        res.redirect('back');
                    })
                    .catch((err) => {
                        res.send(err);
                    });
            } else {
                console.log("Product doesn't exist");
                req.flash('fail', { msg: 'Purchase failed' });
                res.redirect('back');
            }
        } catch (err) {
            console.log(err);
        }
    }
};