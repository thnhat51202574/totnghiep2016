var mongoose = require('mongoose');


var addressSchema = new mongoose.Schema({ 
 name:String,
 address:String,
 phonenumber:String,
 description: String,
 website:String,
 rate: Number,
 picture:[String],

});

module.exports = mongoose.model('address', addressSchema);