var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name: {type: String, required: true},
    categories: [{type: Schema.Types.ObjectId, ref: 'Category'}],
    user: {type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Gradebook', schema);