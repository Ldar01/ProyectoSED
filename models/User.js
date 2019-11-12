const Mongoose = require("mongoose");

//Creando el modelo para tener un mejor manejo de datos
let UserModel = Mongoose.Schema({
    username: {type: String, unique: true},
    email: {type:String, unique: true},
    password: {required: true, type: String}
});

module.exports = Mongoose.model("UserModel", UserModel);