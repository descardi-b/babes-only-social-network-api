require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');


const app = express();


const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('successfully connected! 🍃');
    })
    .catch(err => console.log(err));

// prepend '/' to every route declared in routes
app.use(routes);

app.listen(PORT, () => console.log('successfully created server 🖥️'));