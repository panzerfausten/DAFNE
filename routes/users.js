var express = require('express');
var router = express.Router();
var userController    = require('../controllers/userController.js');

router.post('/login' ,userController.login);
router.post('/create',userController.create);

module.exports = router;
