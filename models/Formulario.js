var Mongoose = require("mongoose");

const FormModel = Mongoose.Schema({
    evento: String,
    lugar: String,
    costo: Number,
    organizador:String,
    descripcion: String
});

module.exports = Mongoose.model("FormModel", FormModel);