const product = require('../Models/product');

module.exports = {
    getProducts: async (req, res) => {
        try{
            const products = await product.find();
            //const productsLeft = await product.countDocuments({completed: false});
            res.render('admin.ejs', {products: products});
        }catch(err){
            console.log(err);
        }
    },
    createProduct: async (req, res) => {
        try{
            await product.create({
                name: 'Name', 
                price: '$0.00',
                featured: false,
            });
            res.redirect('/admin');
        }catch(err){
            console.log(err);
        }
    },
    updateProduct: async (req, res) => {
        try{
            await product.replaceOne({
                _id: req.body._id
            },
            {
                name: req.body.name, 
                price: req.body.price,
                featured: req.body.featured,
            });
            res.redirect('/admin');
        }catch(err){
            console.log(err);
        }
    },
    deleteProduct: async (req, res) => {
        try{
            await product.deleteOne({
                _id: req.body._id
            });
            res.redirect('/admin');
        }catch(err){
            console.log(err);
        }
    },
};