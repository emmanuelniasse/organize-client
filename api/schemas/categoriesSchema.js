const mongoose = require('mongoose');
const { Schema } = mongoose;

const categoriesSchema = new Schema({
    name: String,
    slug: String,
});

const Categories = mongoose.model('Categories', categoriesSchema);

module.exports = Categories;
