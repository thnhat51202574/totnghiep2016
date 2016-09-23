var mongoose = require('mongoose');


var eventSchema = new mongoose.Schema({
 eventname:String,
 created: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
 arUser:[{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
 starttime: Date,
 endtime: Date,
 description: String,
 // from
 //to

});

module.exports = mongoose.model('event', eventSchema);