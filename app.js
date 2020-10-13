const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./API/routes/products');
const orderRoutes = require('./API/routes/orders');

mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb+srv://user_1:' + process.env.MONGO_ATLAS_PW + '@cluster0.gaewi.gcp.mongodb.net/Cluster0?retryWrites=true&w=majority', { useNewUrlParser: true });


app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Acces-Control-Allow-Origin', '*');
    res.header('Acces-Control-Allow-Header', 'Origin, X-Requsted-Width, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Acces-Control-Allow-Method', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({})
    }
    next();
});
app.use('/products', productRoutes);
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