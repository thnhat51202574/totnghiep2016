var mongoose = require('mongoose');


var ratingSchema = new mongoose.Schema({
  _userid: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  _addressid: {type: mongoose.Schema.Types.ObjectId, ref:'address'},
  value: Number
});

module.exports = mongoose.model('rating', ratingSchema);