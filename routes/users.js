var express = require('express');
var router = express.Router();
var userController    = require('../controllers/userController.js');

router.post('/login' ,userController.login);
router.post('/create',userController.create);
router.get('/logout',userController.logout);
router.get('/me',userController.me);
router.post('/change_password',userController.change_password)
module.exports = router;
