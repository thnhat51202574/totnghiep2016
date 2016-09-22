var mongoose = require('mongoose');


var conversationSchema = new mongoose.Schema({ 
  _user1id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  _user2id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  createDate: Date
});

module.exports = mongoose.model('conversation', conversationSchema);