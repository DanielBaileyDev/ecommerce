const product = require('../Models/product');

module.exports = {
    getProducts: async (req, res) => {
        try{
            const products = await product.find();
            //const productsLeft = await product.countDocuments({completed: false});
            res.render('products.ejs', {products: products});
        }catch(err){
            console.log(err);
        }
    }
};