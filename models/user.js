var mongoose = require('mongoose');


var userSchema = new mongoose.Schema({ 
 username: {
    type: String,
    required: true,
    unique: true   
  },
  password: {
    type: String,
    required: true
  },  
  firstName: String,
  lastName:String,
  birthday: Date,
  friends:[{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

module.exports = mongoose.model('User', userSchema);