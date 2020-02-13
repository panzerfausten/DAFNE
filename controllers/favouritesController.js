/* Copyright (C) EIPCM - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Darien Miranda <dmiranda@eipcm.org>, October 2019
 */
var _Cookies         = require('cookies');
var Users            = require('../schemas/Users.js');
var Cookies          = require("../schemas/Cookies");
var Favourites       = require("../schemas/Favourites");

var RESPONSE_ERROR_SERVICE_NA        = {"success":true,"error":"Service not available"};
var RESPONSE_INVALID_AUTH            = {"success":false,"error":"Invalid Auth"};
var RESPONSE_INVALID_EMAIL           = {"success":false,"error":"Invalid email"};


exports.index   = function(req,res,next){
  var cookies = new _Cookies( req, res);
  var idToken = cookies.get( "token" );
  function validate_cookie(result){
    if(result.valid_token){
      Favourites.find({user:result.user},function(err,favs){
        if(err){
          res.status(503).json(RESPONSE_ERROR_SERVICE_NA)
        }else{
          res.status(201).json(
            {
              "success":true,
              "errors":null,
              "favourites":favs
            }
          );
        }
      });
    }else{
      return res.send(RESPONSE_INVALID_AUTH);
    }
  }
  let _C = new Cookies({uid:-1});
  _C.validateToken(idToken,validate_cookie);
}
exports.add   = function(req,res,next){
  var cookies = new _Cookies( req, res);
  var idToken = cookies.get( "token" );
  let pathway_index = sanitizeString(req.body.pathway_index);
  let pathway_name  = sanitizeString(req.body.pathway_name);

  function validate_cookie(result){
    if(result.valid_token){
      let newFav = {
        user:result.user,
        pathway_index:pathway_index,
        dataset:"default",
        pathway_name:pathway_name
      };
      let findQuery = {
        pathway_index:pathway_index,
        dataset:"default",
        pathway_name:pathway_name
      }
      Favourites.findOneAndUpdate(findQuery,newFav,{upsert: true},function(err,f){
        if(err){
          res.status(503).json(RESPONSE_ERROR_SERVICE_NA)
        }else{
          res.status(201).json(
            {
              "success":true,
              "errors":null,
              "message":"Favourite added",
              "favourite":f
            }
          );
        }
      });
    }else{
      return res.send(RESPONSE_INVALID_AUTH);
    }
  }
  let _C = new Cookies({uid:-1});
  _C.validateToken(idToken,validate_cookie);
}
exports.remove   = function(req,res,next){
  var cookies = new _Cookies( req, res);
  var idToken = cookies.get( "token" );
  let pathway_index = sanitizeString(req.body.pathway_index);
  let pathway_name  = sanitizeString(req.body.pathway_name);
  function validate_cookie(result){
    if(result.valid_token){
      Favourites.deleteOne({
          user:result.user,
          pathway_index:pathway_index,
          pathway_name:pathway_name
        },function(err){
        if(err){
          res.status(503).json(RESPONSE_ERROR_SERVICE_NA)
        }else{
          res.status(201).json(
            {
              "success":true,
              "errors":null,
              "message":"Favourite removed",
            }
          );
        }
      });
    }else{
      return res.send(RESPONSE_INVALID_AUTH);
    }
  }
  let _C = new Cookies({uid:-1});
  _C.validateToken(idToken,validate_cookie);
}
exports.mines   = function(req,res,next){
  var cookies = new _Cookies( req, res);
  var idToken = cookies.get( "token" );
  function validate_cookie(result){
    if(result.valid_token){
      Favourites.find(,function(err,favs){
        if(err){
          res.status(503).json(RESPONSE_ERROR_SERVICE_NA)
        }else{
          res.status(201).json(
            {
              "success":true,
              "errors":null,
              "favourites":favs
            }
          );
        }
      });
    }else{
      return res.send(RESPONSE_INVALID_AUTH);
    }
  }
  let _C = new Cookies({uid:-1});
  _C.validateToken(idToken,validate_cookie);
}

/*
 * Sanitation process for a given string.
 *
 * @params String string
 *
 * @returns String | null
 */
let sanitizeString = function (string) {
  string = (string === undefined) ? "" : string
  string = string.toString().trim()
  return (string === "") ? null : string
}
