var mongoose = require('mongoose');


var messageSchema = new mongoose.Schema({ 
	fromUser: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	group:{type: mongoose.Schema.Types.ObjectId, ref: 'groupchat'},
	conversation:{type: mongoose.Schema.Types.ObjectId, ref: 'conversation'},
	content:String,
	createDate: Date
});

module.exports = mongoose.model('message', messageSchema);