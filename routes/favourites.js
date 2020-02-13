var express = require('express');
var router  = express.Router();
var favouritesController = require('../controllers/favouritesController.js');


router.get('/',favouritesController.index);
router.get('/mines',favouritesController.mines);
router.post('/add'    ,favouritesController.add);
router.post('/remove' ,favouritesController.remove);


module.exports = router;
