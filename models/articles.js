let mongoose = require('mongoose');


let ArticleSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: false
    },
    author: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Author' }]

});

let Article = mongoose.model('Article', ArticleSchema);

module.exports = {Article};
