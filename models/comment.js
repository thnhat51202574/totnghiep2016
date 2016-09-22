var mongoose = require('mongoose');


var commentSchema = new mongoose.Schema({ 
	_addressId: {type: mongoose.Schema.Types.ObjectId, ref: 'address'},
	_userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	content: String,
	date: Date
});

module.exports = mongoose.model('comment', commentSchema);