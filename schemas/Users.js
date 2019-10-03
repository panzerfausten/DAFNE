/* Copyright (C) EIPCM - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Darien Miranda <dmiranda@eipcm.org>, October 2019
 */
var bcrypt         = require('bcrypt');
var mongoose       = require('mongoose');
var jwt            = require('jsonwebtoken');
var config         = require('config');


//Config files
const httpPort     = config.get('App.httpPort');
const httpsPort    = config.get('App.httpsPort');
const appMode      = config.get('App.mode');

const DB_PASSWORD  = config.get('Database.password');
const DB_URL       = config.get('Database.url');
const DB_USERNAME  = config.get('Database.username');
const DB_DATABASE  = config.get('Database.database');
const DB_PORT      = config.get('Database.port');

//validators
var validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

var db = mongoose.connect(
  `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_URL}:${DB_PORT}/${DB_DATABASE}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true

  }
);

const saltRounds = 10;


var optionalWithLength = function(minLength, maxLength) {
  minLength = minLength || 0;
  maxLength = maxLength || Infinity;
  return {
    validator : function(value) {
      if (value === undefined) return true;
      if (value === null) return true;
      if (value === "") return true;
      return value.length >= minLength && value.length <= maxLength;
    },
    message : 'Optional field is shorter than the minimum allowed length (' + minLength + ') or larger than the maximum allowed length (' + maxLength + ')'
  }
}
var usersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required:false,
      minlength: [2, 'Name too short'],
      maxlength: [140, 'Name too long']
    },
    last_name: {
      type: String,
      required:false,
      minlength: [3, 'Last name too short'],
      maxlength: [140, 'Last name too long']
    },
    password:  {
      type: String,
      required:true,
      minlength:[6,"Password too short"]
    }, //salted
    source: String,
    uid:{
      type:String,
      required:false
    },
    email:
    {
      required:true,
      type: String,
      validate:[validateEmail,"E-mail is not valid"],
      index:
      {
        unique: true,
        dropDups:true
      },
      lowercase:true
    },
  },
  {
    timestamps: { createdAt: 'created_at' }
  }
);

usersSchema.methods.login = function(email,pwd,cb){
  let _cbObj = {
    error:null,
    success:false,
    reason:"",
    reason_es:"",
    token:null,
    user:{
      uid:null
    }
  }
  this.model("Users").findOne({ email:email }, function (err, user) {
    if(err) return cb(err);
    if(user === null){
      _cbObj.reason    = "Invalid user";
      return cb(_cbObj);
    }
    bcrypt.compare(pwd, user.password, function(err, res) {
      console.log(res);
      if(!res){
        _cbObj.reason    = "Invalid password"
        cb(_cbObj);
      }else{
        //  create jwt
        let token = jwt.sign({
          exp: Math.floor(Date.now() / 1000) ,
          data: user._id.toString()
        }, 'secret');
        _cbObj.token   = token;
        _cbObj.success = true;
        _cbObj["user"]["_id"]   = user._id;
        _cbObj["user"]["uid"]   = user.uid;
        _cbObj["user"]["email"] = user.email;
        _cbObj["user"]["name"]  = user.name;


        cb(_cbObj);
      }
    });
  });
}

usersSchema.pre('save', function(next) {
  //add salt to password and add source
  if(this.password === undefined){ //avoid deleting the password on update
    return next();
  }
  let _schema = this;
  var _pwd    = _schema.password;
  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(_pwd, salt, function(err, hash) {
      _schema.password = hash;
      _schema.source   = 'dafne';
      _schema.uid      = _schema._id.toString();
      next();
    });
  });
});

var Users = mongoose.model('Users',usersSchema);

Users.init().then(() => {
  console.log("unique index: user email created");
});

module.exports = Users;
