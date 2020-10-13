const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Product = require('../models/products');

router.get('/', (req, res, next) => {
        res.status(200).json({
            message: "Handler GET works to /products"
        })
    })
    // github post all ok
router.post('/', (req, res, next) => {

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })

    product
        .save()
        .then(result => {
            console.log(result);
        })
        .catch(err => console.log(err));
    res.status(200).json({
        message: "Handler POST works to /products",
        createdProduct: product
    })
})


router.get('/:productID', (req, res, next) => {
    const id = req.params.productID;
    if (id === 'special') {
        res.status(200).json({
            message: "This is the SPECIAL id",
            id: id

        })
    } else {

        res.status(200).json({
            message: "This is a diferent ID"
        })
    }
});


router.patch('/:productID', (req, res, next) => {
    const id = req.params.productID;
    res.status(200).json({
        message: id + " was UPDATED"
    })
    console.log(id);

});


router.delete('/:productID', (req, res, next) => {
    const id = req.params.productID;
    res.status(200).json({
        message: id + "  was DELETED"
    })
    console.log(id);

});



module.exports = router;