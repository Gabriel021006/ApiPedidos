const mongoose = require ("mongoose");

const pedidosModel = new mongoose.Schema({

id:String,
idMesa:String,
itensPedido:Number,
status:String

});

module.exports = pedidosModel;
