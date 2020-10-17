const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectID,
    Lat: {
        type: [Number],
        required: true
    },
    Long: {
        type: [Number],
        required: true
    },
    // TimeStamp: String,
    // DateStamp: String,
    properties: {
        Lat: Number,
        Long: Number
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