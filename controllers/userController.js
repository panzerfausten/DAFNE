/* Copyright (C) EIPCM - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Darien Miranda <dmiranda@eipcm.org>, October 2019
 */
var _Cookies         = require('cookies');
var Users            = require('../schemas/Users.js');
var Cookies          = require("../schemas/Cookies");
var RESPONSE_ERROR_SERVICE_NA        = {"success":true,"error":"Service not available"};
var RESPONSE_INVALID_AUTH            = {"success":false,"error":"Invalid Auth"};
var RESPONSE_INVALID_EMAIL           = {"success":false,"error":"Invalid email"};

exports.me   = function(req,res,next){
  var cookies = new _Cookies( req, res);
  var idToken = cookies.get( "token" );
  function validate_cookie(result){
    if(result.valid_token){
      res.status(200).send(result);
    }else{
      return res.send(RESPONSE_INVALID_AUTH);
    }
  }
  let _C = new Cookies({uid:-1});
  _C.validateToken(idToken,validate_cookie);
}
exports.create = function(req,res,next){
    let _name      = sanitizeString(req.body.name);
    let _last_name = sanitizeString(req.body.last_name);
    let _email     = sanitizeString(req.body.email);
    let _password  = sanitizeString(req.body.password);
    var cookies    = new _Cookies( req, res);
    let _User      = new Users({email:_email});
    let user = new Users(
      {
        name: _name,
        password:_password,
        email:_email,
        last_name:_last_name
      });
    user.save(function(err,user){
      if(err){
        return res.status(400).json({"success":false,"errors":err.errors,"message":null});
      }else{
        //After creating the user, we log him in.
        function login_result(r){
          if(r.success){
            let cookie = new Cookies({token:r.token, uid:r.user.uid});
            let selector = {"uid":r.user.uid};
            Cookies.findOneAndUpdate(selector, {"uid":r.user.uid,"token":r.token},{upsert:true},function(err, doc){
              if(err){
                res.status(503).json(RESPONSE_ERROR_SERVICE_NA)
              }else{
                //storage cookie in browser
                var d = new Date();
                var year = d.getFullYear();
                var month = d.getMonth();
                var day = d.getDate();
                var c = new Date(year + 1, month, day)  //set cookie expiration after 1 year
                cookies.set( "token", r.token, { httpOnly: false,expires: c } )
                return res.status(201).json({"success":true,"result":r,"message":"User created"});
              }
            });
          }else{
            return res.status(401).json({"success":false,"result":r});
          }
        }
        _User.login(_email,_password,login_result);
      }
    });
}
/*
 * Login
 * POST email,password
 */
exports.login = function(req,res,next){
  var cookies    = new _Cookies( req, res);
  let _email     = req.body.email;
  let _pwd       = req.body.password;
  let _User      = new Users({email:_email});
  function login_result(r){
    if(r.success){
      let cookie = new Cookies({token:r.token, uid:r.user.uid});
      let selector = {"uid":r.user.uid};
      Cookies.findOneAndUpdate(selector, {"uid":r.user.uid,"token":r.token},{upsert:true},function(err, doc){
          if(err){
            res.status(503).json(RESPONSE_ERROR_SERVICE_NA)
          }else{
            //storage cookie in browser
            var d = new Date();
            var year = d.getFullYear();
            var month = d.getMonth();
            var day = d.getDate();
            var c = new Date(year + 1, month, day)  //set cookie expiration after 1 year
            cookies.set( "token", r.token, { httpOnly: false,expires: c } )
            return res.status(201).json({"success":true,"result":r});
          }
      });
    }else{
      return res.status(401).json({"success":false,"result":r});
    }
  }
  _User.login(_email,_pwd,login_result);
}
exports.logout = function(req,res,next){
  var cookies = new _Cookies( req, res);
  var idToken = cookies.get( "token" );

  function validate_cookie(result){
    cookies.set( "token","", { httpOnly: false,expires: new Date() } )
    if(result.valid_token){
      function logout_callback(){
        return res.status(201).json({"success":true,"error":null});
      }
      let _C = new Cookies({uid:-1});
      _C.invalidateToken(idToken,logout_callback)
    }else{
      return res.status(401).json({"success":false,"error":"Invalid auth"});
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
