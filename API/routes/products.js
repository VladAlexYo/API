const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Product = require('../models/products');





router.get('/', (req, res, next) => {
        Product.find()
            .exec()
            .then(docs => {
                console.log(docs);
                res.status(200).json(docs);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    message: 'No valid entry',
                    error: err
                });
            })
    })
    // github post all ok
router.post('/', (req, res, next) => {


    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        Lat: req.body.Lat,
        Long: req.body.Long,
        // TimeStamp: new Date().toLocaleTimeString(),
        // DateStamp: new Date().toLocaleDateString(),
        type: "Feature",
        properties: {
            name: "ceva",
            temperatura: "4 grade"
        },

        geometry: {
            type: "Point",
            coordinates: [req.body.Long, req.body.Lat]
        }

    })

    product
        .save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: "Handler POST works to /GPS_Records",
                createdProduct: result,
                geoJson: "GeoJSON",

            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
})

router.get('/:recordID', (req, res, next) => {
    const id = req.params.recordID;
    Product.findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'No valid entry',
                error: err
            });
        })
})

router.patch('/:productID', (req, res, next) => {
    const id = req.params.productID;
    res.status(200).json({
        message: id + " was UPDATED"
    })
    console.log(id);
});


router.delete('/:deleteRecord', (req, res, next) => {
    Product.remove()
        .exec()
        .then(
            res.status(200).json({
                message: "All data DELETED"
            })
        ).catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'No valid entry',
                error: err
            });
        });

})

module.exports = router;


// {
//     "type": "FeatureCollection",
//     "features": [{
//         "type": "Feature",
//         "properties": {
//             "name": "ceva",
//             "temperatura": "4 grade"
//         },
//         "geometry": {
//             "coordinates": [44.22, 29],
//             "type": "Point"
//         }
//     }, {
//         "type": "Feature",
//         "properties": {
//             "name": "ceva",
//             "temperatura": "4 grade"
//         },
//         "geometry": {
//             "coordinates": [34.22, 29],
//             "type": "Point"
//         }
//     }]
// }