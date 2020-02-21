/* Copyright (C) EIPCM - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Darien Miranda <dmiranda@eipcm.org>, February 2020
 */
var _Cookies         = require('cookies');
var Users            = require('../schemas/Users.js');
var Cookies          = require("../schemas/Cookies");
var Comments         = require("../schemas/Comments");

var RESPONSE_ERROR_SERVICE_NA        = {"success":true,"error":"Service not available"};
var RESPONSE_INVALID_AUTH            = {"success":false,"error":"Invalid Auth"};
var RESPONSE_INVALID_EMAIL           = {"success":false,"error":"Invalid email"};


exports.index   = function(req,res,next){
  var cookies = new _Cookies( req, res);
  var idToken = cookies.get( "token" );
  let pathway_name = req.query.pathway_name;
  function validate_cookie(result){
    if(result.valid_token){
      Comments
      .find({pathway_name:pathway_name})
      .populate({
        path:"user",
        select:"_id name email last_name source uid"
      }).exec(function(err,comments){
        if(err){
          res.status(503).json(RESPONSE_ERROR_SERVICE_NA)
        }else{
          res.status(201).json(
            {
              "success":true,
              "errors":null,
              "comments":comments
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
exports.create   = function(req,res,next){
  var cookies = new _Cookies( req, res);
  var idToken = cookies.get( "token" );
  let pathway_index = sanitizeString(req.body.pathway_index);
  let pathway_name  = sanitizeString(req.body.pathway_name);
  let comment  = sanitizeString(req.body.comment);

  function validate_cookie(result){
    if(result.valid_token){
      let newComment = new Comments({
        user:result.user,
        pathway_index:pathway_index,
        dataset:"default",
        pathway_name:pathway_name,
        comment:comment
      });
      newComment.save(function(err,c){
        if(err){
          res.status(503).json(RESPONSE_ERROR_SERVICE_NA)
        }else{
          res.status(201).json(
            {
              "success":true,
              "errors":null,
              "message":"Comment added",
              "comment":c
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
