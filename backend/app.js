//MONGODB CONNECTION:mongodb+srv://project6:<password>@cluster0.c189u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority


const express = require('express');
const bodyParser = require('body-parser');
const mongoose =  require('mongoose');
const path =  require('path');
var mongoMask = require('mongo-mask')

const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

const app = express();
mongoose.connect('mongodb+srv://project6:Project6OpenClassroom@cluster0.c189u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
.then(() => {
console.log('Successfully connected to MongoDb Atlas');
}).catch((error) => {
console.log('Unable to connect to MongoDb Atlas');
console.log('Update your mongodb');
console.log(error);

});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());
//app.use('',express.static(path.join(__dirname, 'assets/images')));
app.use('/api/sauces',sauceRoutes);
app.use('/api/auth',userRoutes);

module.exports = app;