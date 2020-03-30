// MONGODB CONNECTION
const mongoose = require('mongoose');
require('dotenv').config();
// const mui = process.env.MONGO_URI;
const config = require('config');
// DOTENV ///////
// const u = process.env.DB_USER;
// const up = process.env.WRD_PASS;
// const stringToTheGoose = `mongodb+srv://${u}:${up}@devconnector-c8q6m.mongodb.net/test?retryWrites=true&w=majority`
/////////////////

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || config.get('mongoURI'), {
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