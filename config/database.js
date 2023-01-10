const mongoose = require('mongoose');

async function connectDB() {
    try {
        mongoose.set('strictQuery', false);
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

module.exports = connectDB;