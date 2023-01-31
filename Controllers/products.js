const product = require('../Models/product');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

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
                role: loggedIn ? req.user.role : null
            });
        } catch (err) {
            console.log(err);
        }
    },
    postPayment: async (req, res) => {
        // Moreover you can take more details from user
        // like Address, Name, etc from form
        stripe.customers.create({
            email: req.body.stripeEmail,
            source: req.body.stripeToken,
            /*name: 'Gourav Hammad',
            address: {
                line1: 'TC 9/4 Old MES colony',
                postal_code: '452331',
                city: 'Indore',
                state: 'Madhya Pradesh',
                country: 'India',
            }*/
        })
            .then((customer) => {
                return stripe.charges.create({
                    amount: 2500,
                    description: 'Web Development Product',
                    currency: 'aud',
                    customer: customer.id
                });
            })
            .then((charge) => {
                res.send("Success");
            })
            .catch((err) => {
                res.send(err);
            });
    }
};