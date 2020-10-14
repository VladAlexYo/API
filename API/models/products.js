const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectID,
    Lat: Number,
    Long: Number,
    TimeStamp: String,
    DateStamp: String
});

module.exports = mongoose.model('Product', productSchema)