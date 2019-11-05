/* Copyright (C) EIPCM - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Darien Miranda <dmiranda@eipcm.org>, November 2019
 */
var mongoose       = require('mongoose');
var   config       = require('config');
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

var db = mongoose.connect(
  `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_URL}:${DB_PORT}/${DB_DATABASE}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

var perspectivesSchema = new mongoose.Schema(
  {
    name:{
      type: String,
      required:true,
      minlength: [2, 'Name too short'],
      maxlength: [140, 'Name too long']
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
      required:true
    },
    filter:{
      type: String,
      required:true,
    },
    mode:{
      type:String,
      required:true,
      default:"satisfaction"
    },
    showScales:{
      type:Boolean,
      required:true,
      default:true
    },
    shortId:{
      type:String,
      required:true
    }
  },
  {
    timestamps: { createdAt: 'created_at' }
  }
);
var Perspectives = mongoose.model('Perspectives',perspectivesSchema);

module.exports = Perspectives;
