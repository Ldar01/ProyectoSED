var express = require('express');
var router = express.Router();
var UserController = require("../controllers/UserController");

/* GET home page. */
router.get('/', function(req, res) {
  return res.render('registro');
});

router.post('/', UserController.insertNewUser);

module.exports = router;