const mongoose = require('mongoose');

// Connect to MongoDB
const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Db Connected')
    } catch (error) {
        console.log('DB Connection Error');
    }
};

module.exports = connectDB;
