const product = require('../models/product');
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

            const paymentIntent = await stripe.paymentIntents.create({
                amount: dollarsToCents(products.price),
                currency: "aud",
                automatic_payment_methods: {
                    enabled: true,
                },
            });

            res.send({
                clientSecret: paymentIntent.client_secret,
            });
        } catch (err) {
            console.log(err);
        }
    }
};