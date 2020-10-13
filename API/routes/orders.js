const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Handler GET works to /orders"
    })
})


router.post('/', (req, res, next) => {

    const order = {
        productID: req.body.productID,
        quantity: req.body.quantity
    }
    res.status(200).json({
        message: "Handler POST works to /orders",
        order: order
    })
})

router.get('/:orderID', (req, res, next) => {
    const id = req.params.orderID;
    res.status(200).json({
        message: id + ' was GET'
    })
})


router.post('/:orderID', (req, res, next) => {
    const id = req.params.orderID;
    res.status(200).json({
        message: id + ' order was created'
    })
})

router.delete('/:orderID', (req, res, next) => {
    const id = req.params.orderID;
    res.status(200).json({
        message: id + ' order was deleted'
    })
})

module.exports = router;