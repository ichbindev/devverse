const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const connectDB = require('./config/db');

// connect database
connectDB();

// init MIDDLEWARE
app.use(express.json({ extended: false }))

// define routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/posts', require('./routes/api/posts'))

app.get('/', (req,res) => res.send("API SERVER STARTED"))

app.listen(PORT, () => console.log(`Express Server listening at port-> ${PORT}`))