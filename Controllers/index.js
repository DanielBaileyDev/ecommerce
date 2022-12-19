const product = require('../Models/product');

module.exports = {
    getFeatured: async (req, res) => {
        try{
            const products = await product.find({featured: true});
            //const productsLeft = await product.countDocuments({completed: false});
            res.render('index.ejs', {products: products});
        }catch(err){
            console.log(err);
        }
    }
};