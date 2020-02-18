/* Copyright (C) EIPCM - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Darien Miranda <dmiranda@eipcm.org>, February 2020
 */
var mongoose       = require('mongoose');
var config         = require('config');
let Schema         = mongoose.Schema;


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
var favouritesSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
      required:true
    },
    pathway_index: {
      type: Number,
      required:true,
    },
    dataset:  {
      type: String,
      required:true
    },
    pathway_name: String,
  },
  {
    timestamps: { createdAt: 'created_at' }
  }
);

var Favourites = mongoose.model('Favourites',favouritesSchema);

module.exports = Favourites;
