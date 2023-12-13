const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

const category = mongoose.model('Category', CategorySchema);

module.exports =  category;