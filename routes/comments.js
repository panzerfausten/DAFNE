var express = require('express');
var router  = express.Router();
var commentsController = require('../controllers/commentsController.js');


router.get('/',commentsController.index);
router.post('/create',commentsController.create);

module.exports = router;
