
var User = require('../models/User');
var bcrypt =require('bcrypt');
var moment = require('moment');
const SALT_WORK_FACTOR = 10;
function userserver(app) {

app.post('/api/user',function(req,res,next){
  var username = req.body.username;
  var password = req.body.password;
  var firstName =req.body.firstName;
  var lastName = req.body.lastName;
  var birthday = req.body.birthday;
  birthday = moment();
  var friends_id = req.body.friends_id;
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);
        // hash the password along with our new salt
        bcrypt.hash(password, salt, function(err1, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            password = hash;
        User.findOne({username:username}, function(err2, alreadyUser){
          if((err2)||(!alreadyUser)){
              var user = new User({
                username:username,
                password:password,
                firstName:firstName,
                lastName:lastName,
                birthday:birthday,
                friends:friends_id
              });
              user.save(function(error){
                if(err) return next(error);
                console.log("OK");
                res.send({message:username + " had been add successfully"});
              });
          }
          else {
                res.send({message:username + " aleardy in database"});
          }
        });    
          });
  });     



});
app.get('/api/user',function(req,res,next){
  User
  .find()
  .populate('friends')
  .sort({_id:-1})
  .exec(function(err,users){
    if(err) return next(err);
    res.send({users:users});
  });
});

app.put('/api/user/addfriend',function(req,res,next){
  var id = req.body._id;
  var friend_id = req.body.friend_id;
  User.update({_id:id},{$push:{friends:friend_id}},function(err){
      if(err) return next(err);      
    });
  User.update({_id:friend_id},{$push:{friends:id}},function(err){
      if(err) return next(err);      
    });
  res.send({message:"Add friend successfully"});
});

app.put('/api/user/unfriend',function(req,res,next){
  var id = req.body._id;
  var friend_id = req.body.friend_id;
  User.update({_id:id},{$pull:{friends:friend_id}},function(err){
      if(err) return next(err);      
    });
  User.update({_id:friend_id},{$pull:{friends:id}},function(err){
      if(err) return next(err);      
    });
  res.send({message:"Unfriend successfully"});
});

app.put('/api/user',function(req,res,next){
  var id = req.body._id;
  var username = req.body.username;
  var password = req.body.password;
  var firstName =req.body.firstName;
  var lastName =req.body.lastName;
  var birthday = req.body.birthday;
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);
        // hash the password along with our new salt
        bcrypt.hash(password, salt, function(err1, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            password = hash;
          });
          User.update(
            {_id:id},
            {
              $set:{
                    username:username,
                    password:password,
                    firstName:firstName,
                    lastName:lastName,
                    birthday:birthday
              }}
              ,function(err){
            if(err) return next(err);
            res.send({message:username + " had been update successfully"});
          });
      });
});

app.get('/api/user/:id',function(req,res,next){

  var userid = req.params.id;
  User
    .findOne({_id:userid})
    .populate('friends')
    .sort({_id:-1})
    .exec(function(err,users){
      if(err) return next(err);
      res.send({users:users});
    });
});


app.delete('/api/user/:id',function(req,res,next){

  var userid = req.params.id;
  console.log(userid);
  User
  .remove({_id:userid})
  .exec(function(err){
    if(err) return next(err);
    res.send({message:"Delete User sucessful"});
  });
});
}

module.exports = userserver;
