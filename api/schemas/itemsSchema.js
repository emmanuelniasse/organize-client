const mongoose = require('mongoose');
const { Schema } = mongoose;

const ItemsSchema = new Schema({
    name: String,
    slug: String,
});

const Items = mongoose.model('Items', ItemsSchema);

module.exports = Items;
