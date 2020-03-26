// MONGODB CONNECTION
const mongoose = require('mongoose');
require('dotenv').config();
const mui = process.env.MONGO_URI;


const connectDB = async () => {
    try {
        await mongoose.connect(mui, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('mongoDB connected...')
    } catch(err) {
        console.error(err.message);
        // exit process with failure
        process.exit(1);
    }
}
module.exports = connectDB;