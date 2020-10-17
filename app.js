const express = require('express');
var cors = require('cors');
const app = express();
// const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./API/routes/products');
const orderRoutes = require('./API/routes/orders');

mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb+srv://user_1:user_1@cluster0.gaewi.gcp.mongodb.net/Cluster0?retryWrites=true&w=majority', { useNewUrlParser: true });
// cacascascacascac

// app.use(morgan('dev')); 
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Header', 'Origin, X-Requsted-Width, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Acces-Control-Allow-Method', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({})
    }
    next();
});
app.use('/records', productRoutes);
app.use('/orders', orderRoutes);

app.use((req, res, next) => {
    const error = new Error(' Not found');
    error.status = 404
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: { message: error.message }

    })

})

module.exports = app;