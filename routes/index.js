var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  return res.render('index2');
});

module.exports = router;
