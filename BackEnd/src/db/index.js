const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { DB_NAME } = require('../utils/constants.js');

dotenv.config();

const URI = process.env.MONGODB_URI.replace(/\/$/, ""); // remove trailing slash if any

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${URI}/${DB_NAME}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`\nMongoDB connected! Host: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("MONGODB connection error:", error);
        process.exit(1);
    }
};

module.exports = connectDB;
