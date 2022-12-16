//const Todo = require('../models/Todo');

module.exports = {
    getIndex: async (req, res) => {
        try{
            /*const todoItems = await Todo.find()
            const itemsLeft = await Todo.countDocuments({completed: false})*/
            res.render('index.ejs'/*, {todos: todoItems, left: itemsLeft}*/);
        }catch(err){
            console.log(err);
        }
    }
};