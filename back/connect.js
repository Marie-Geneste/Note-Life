require('dotenv').config({path: '.env'});
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        console.log(process.env.MONGODB_URI);
        const connexion = await mongoose.connect(process.env.MONGODB_URI, {
            useNewURLParser: true,
            useUnifiedTopology: true
        })
        console.log(`Connected to DB: ${connexion.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;