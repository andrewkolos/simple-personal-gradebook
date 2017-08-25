var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name: {type: String, required: true},
    categories: [{
        name: {type: String, required: true},
        weight: {type: Number},
        assignments: [{
            name: {type: String, required: true},
            earned: {type: Number},
            worth: {type: Number}
        }]
    }],
    user: {type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Gradebook', schema);