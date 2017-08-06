var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name: {type: String, required: true},
    weight: {type: String, required: true},
    assignments: [{type: Schema.Types.ObjectId, ref: 'Assignment'}]
});

module.exports = mongoose.model('Category', schema);