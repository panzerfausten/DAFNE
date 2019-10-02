/* Copyright (C) EIPCM - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Darien Miranda <dmiranda@eipcm.org>, October 2019
 */
var mongoose       = require('mongoose');
var   config       = require('config');

//Config files
const httpPort     = config.get('App.httpPort');
const httpsPort    = config.get('App.httpsPort');
const appMode      = config.get('App.mode');

const DB_PASSWORD  = config.get('Database.password');
const DB_URL       = config.get('Database.url');
const DB_USERNAME  = config.get('Database.username');
const DB_DATABASE  = config.get('Database.database');
const DB_PORT      = config.get('Database.port');


var db = mongoose.connect(
  `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_URL}:${DB_PORT}/${DB_DATABASE}`,
  {
    useNewUrlParser: true
  }
);

var Users = require("../schemas/Users");

var cookiesSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required:false
    },
    uid: {
      type: String,
      unique: true,
      dropDups:true
    }
  },
  {
    timestamps: { createdAt: 'created_at' }
  }
);
cookiesSchema.methods.validateToken= function(token,cb){
  let fields = "_id name email created_at updatedAt source uid __v valid token " +
  "success ";

  this.model("Cookies").findOne({ token:token }, function (err, c) {
    if(err) cb(err);
    if(c === null){
      return cb({"user":null,"valid_token":false,"success":false});
    }
    Users.findOne({ uid:c.uid }, function (err, user) {
      if(err) cb(err);
      if(user === null){
        return cb({"user":null,"valid_token":false,"success":false});
      }else{
        return cb({"user":user,"valid_token":true,"success":true});
      }
    }).select(fields);
  });

}
cookiesSchema.methods.invalidateToken= function(token,cb){
  this.model("Cookies").findOne({ token:token }).remove(cb);
}

var cookiesModel = mongoose.model('Cookies',cookiesSchema);

module.exports = cookiesModel;
