var mongoose     = require('mongoose');

var Users        = require("../schemas/Users");
var Cookies      = require("../schemas/Cookies");
var Perspectives = require("../schemas/Perspectives");
var _Cookies     = require( "cookies" );
var ObjectID     = require('mongodb').ObjectID;
const shortid    = require('shortid');

var RESPONSE_INVALID_AUTH     = {"success":false,"error":"Invalid Auth"};
var RESPONSE_ERROR_SERVICE_NA = {"success":true,"error":"Service not available"};

exports.index = function (req, res, next) {
  var cookies = new _Cookies( req, res);
  var idToken = cookies.get( "token" );
  function validate_cookie(cookie_user){
    if(cookie_user.valid_token){
      let query = {};
      let sortQuery = {
        sort:{
            created_at: -1
        }
      }
      Perspectives.find(query,{},sortQuery)
      .populate({
        path:"owner",
        select:"name last_name uid email"
      }).
      exec(function (err, perspectives) {
        if(err){
          console.log(err);
          return res.status(503).send(RESPONSE_ERROR_SERVICE_NA);
        }else{
          res.status(201).json(
            {
              "success":true,
              "errors":null,
              "perspectives":perspectives
            }
          );
        }
      });

    }else{
      return res.status(401).json(RESPONSE_INVALID_AUTH);
    }
  }
  let _C = new Cookies({uid:-1});
  _C.validateToken(idToken,validate_cookie);
}
exports.get = function (req, res, next) {
  var cookies = new _Cookies( req, res);
  var idToken = cookies.get( "token" );
  var shortId = req.params.shortId;
  function validate_cookie(cookie_user){
    if(cookie_user.valid_token){
      let query = {"shortId":shortId};
      let sortQuery = {
        sort:{
            created_at: -1
        }
      }
      Perspectives.find(query,{},sortQuery)
      .populate({
        path:"owner",
        select:"name last_name uid email"
      }).
      exec(function (err, perspectives) {
        if(err){
          console.log(err);
          return res.status(503).send(RESPONSE_ERROR_SERVICE_NA);
        }else{
          res.status(201).json(
            {
              "success":true,
              "errors":null,
              "perspectives":perspectives
            }
          );
        }
      });

    }else{
      return res.status(401).json(RESPONSE_INVALID_AUTH);
    }
  }
  let _C = new Cookies({uid:-1});
  _C.validateToken(idToken,validate_cookie);
}
exports.create = function (req,res,next){
  var cookies    = new _Cookies( req, res);
  var idToken    = cookies.get( "token" );
  let name       = sanitizeString(req.body.name);
  let filter     = JSON.stringify(sanitizeString(req.body.filter));
  let mode       = sanitizeString(req.body.mode);
  let showScales = sanitizeString(req.body.showScales);
  let hiddenPathwaysIndexes = sanitizeString(req.body.hiddenPathwaysIndexes);



  function validate_cookie(cookie_user){
    if(cookie_user.valid_token){
      let perspective = new Perspectives(
        {
          owner: ObjectID(cookie_user.user.uid),
          name: name,
          mode: mode,
          showScales: showScales,
          filter: filter,
          hiddenPathwaysIndexes: hiddenPathwaysIndexes,
          shortId: shortid.generate()
        }
      );

      perspective.save(function(err,p){
        if(err){
          console.log(err);
          res.status(503).json(RESPONSE_ERROR_SERVICE_NA)
        }else{
          //FINISH HERE
          res.status(201).json(
            {
              "success":true,
              "errors":null,
              "message":"Perspective created",
              "perspective":p
            }
          );
        }
      });
    }else{
      return res.status(401).json(RESPONSE_INVALID_AUTH);
    }
  }
  let _C = new Cookies({uid:-1});
  _C.validateToken(idToken,validate_cookie);
}
let sanitizeString = function (string) {
  string = (string === undefined) ? "" : string
  string = string.toString().trim()
  return (string === "") ? null : string
}
