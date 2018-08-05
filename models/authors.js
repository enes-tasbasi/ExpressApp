let mongoose = require('mongoose');

let Author = mongoose.model('Author', {
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    }
});

module.exports = {Author};