var express = require('express');
var router = express.Router();
var perspectivesController = require('../controllers/perspectivesController.js');


router.get('/' ,perspectivesController.index);
router.get('/:shortId' ,perspectivesController.get);
router.post('/create',perspectivesController.create);

module.exports = router;
