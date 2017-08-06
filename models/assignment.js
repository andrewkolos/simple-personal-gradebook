var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name: {type: String, required: true},
    earned: {type: Number},
    worth: {type: Number}
});

module.exports = mongoose.model('Assignment', schema);