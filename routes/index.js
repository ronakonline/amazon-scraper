var express = require('express');
var router = express.Router();
var maincontroller = require('../controllers/maincontroller')

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/fetch_product', maincontroller)

module.exports = router;