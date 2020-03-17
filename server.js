const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req,res) => res.send("API SERVER STARTED"))

app.listen(PORT, () => console.log(`Express Server listening at port-> ${PORT}`))