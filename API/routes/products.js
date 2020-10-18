const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Product = require('../models/products');





router.get('/', (req, res, next) => {
        Product.find()
            .select('_id properties type geometry')
            .exec()
            .then(docs => {
                response = {
                    type: 'FeatureCollection',
                    features: docs
                }

                res.status(200).json(response)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    message: 'No valid entry',
                    error: err
                });
            })
    })
    // github post all ok cred caca dadacacac caca caca caca in 2020 casa si in 2021 caca si 20222
router.post('/', (req, res, next) => {


    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        Lat: req.body.Lat,
        Long: req.body.Long,
        // TimeStamp: new Date().toLocaleTimeString(),
        // DateStamp: new Date().toLocaleDateString(),
        type: "Feature",
        properties: {
            Lat: req.body.Lat,
            Long: req.body.Long
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

router.get('/tipPunct/:Feature', (req, res, next) => {
    const type = req.params.Feature;
    Product.find({ type: type }).exec()
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


router.get('/objectID/:recordID', (req, res, next) => {
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




// Product.find({
//     Lat: 144.176814
// }, (error, data) => {
//     if (error) {
//         console.log(error);
//     } else { console.log(data) }
// })


router.patch('/:productID', (req, res, next) => {
    const id = req.params.productID;
    const Lat = req.body.Lat;
    const Long = req.body.Long;
    Product.update({ _id: id }, {
            Lat: Lat,
            Long: Long,
            properties: {
                Lat: Lat,
                Long: Long
            },
            geometry: {
                coordinates: [
                    Lat, Long
                ]
            }
        })
        .exec()
        .then(doc => {
            response = {
                Message: 'Data for' + id + 'valid update ',

            }
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'No valid entry',
                error: err
            });
        })

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