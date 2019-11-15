var express = require('express');
var router = express.Router();
var UserController = require("../controllers/UserController");

/* GET users listing. */
router.get('/', UserController.getAll);
router.get('/:id', UserController.getOneById);
router.get('/:username', UserController.getByUsername);

//Create
router.post('/', UserController.insertNewUser);

//Update
router.put('/:id', UserController.updateUser);

//Delete
router.delete('/:id', UserController.deleteUser);

module.exports = router;
