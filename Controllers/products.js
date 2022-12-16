//const Todo = require('../models/Todo');

module.exports = {
    getProducts: async (req, res) => {
        try{
            /*const todoItems = await Todo.find()
            const itemsLeft = await Todo.countDocuments({completed: false})*/
            res.render('products.ejs'/*, {todos: todoItems, left: itemsLeft}*/);
        }catch(err){
            console.log(err);
        }
    }
};