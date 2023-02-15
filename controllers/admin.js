const product = require('../models/product');
const fs = require('fs');
const path = require('path');

module.exports = {
    getProducts: async (req, res) => {
        try {
            const products = await product.find();
            const loggedIn = req.user ? true : false;
            res.render('admin.ejs', {
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
    createProduct: async (req, res) => {
        try {
            await product.create({
                img: '/imgs/default.jpg',
                name: 'Name',
                price: '0.00',
                featured: false,
            });
            res.status(200).json({ message: "created" })
        } catch (err) {
            console.log(err);
        }
    },
    updateProduct: async (req, res) => {
        try {
            let updatedProduct;
            if (req.file) {
                updatedProduct = {
                    img: '/uploads/' + req.file.filename,
                    name: req.body.name,
                    price: req.body.price,
                    description: req.body.description,
                    featured: req.body.featured,
                };
            } else {
                updatedProduct = {
                    name: req.body.name,
                    price: req.body.price,
                    description: req.body.description,
                    featured: req.body.featured,
                };
            }
            await product.updateOne({
                _id: req.body._id
            }, updatedProduct);
            res.status(200).json({ message: "updated" })
        } catch (err) {
            console.log(err);
        }
    },
    deleteProduct: async (req, res) => {
        try {
            const productDetails = await product.findOneAndDelete({
                _id: req.body._id
            });
            if (productDetails.img && productDetails.img !== '/imgs/default.jpg') {
                fs.unlink(path.join(__dirname, '..', '/public', productDetails.img), (err) => {
                    if (err) {
                        throw err;
                    }
                });
            }
            res.status(200).json({ message: "deleted" })
        } catch (err) {
            console.log(err);
        }
    },
};