const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectID,
    Lat: {
        type: [Number]
    },
    Long: {
        type: [Number]
    },
    // TimeStamp: String,
    // DateStamp: String,
    properties: {
        name: String,
        temperatura: String
    },
    type: {
        type: String,
        enum: ['Feature'],
        required: true
    },
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true,


        }
    }




});

module.exports = mongoose.model('Product', productSchema)