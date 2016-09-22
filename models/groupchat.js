var mongoose = require('mongoose');


var groupchatSchema = new mongoose.Schema({ 
	created: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	arUser:[{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
	createDate: Date
});

module.exports = mongoose.model('groupchat', groupchatSchema);