const product = require('../Models/product');

module.exports = {
    getProducts: async (req, res) => {
        try{
            const products = await product.find();
            //const productsLeft = await product.countDocuments({completed: false});
            const loggedIn = req.user ? true : false;
            res.render('products.ejs', {
                products: products,
                loggedIn: loggedIn,
                username: loggedIn ? req.user.username : null,
                url: req.baseUrl,
            });
        }catch(err){
            console.log(err);
        }
    }
};