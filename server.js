const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;
const connectDB = require('./config/db');

// connect database
connectDB();

// init MIDDLEWARE
app.use(express.json({ extended: false }));

// define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

// Server static assets when DEPLOYED
if (process.env.NODE_ENV === 'production') {
    // Set static folder: index.html to be our static route to be placed in a folder called '/build'
    /**
     * FOR SOME REASON THIS IS MAKING THE APP NOT DEPLOY PROPERLY TO HEROKU
     * 
     * THO IS SAYS BUILD-SUCCESSFUL IT GIVES ME AN APPLICATION ERROR
     * 
     */
    app.use(express.static('client/build'));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}


app.listen(PORT, () => console.log(`Express Server listening at port-> ${PORT}`));