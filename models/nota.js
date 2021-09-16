const { Schema, model } = require("mongoose");

const NotaSchema = Schema({
  titulo: {
    type: String,
    require: true,
  },
  descripcion: {
    type: String,
    require: true,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    require: true,
  },
  estado: {
    type: Boolean,
    require: true,
    default: true,
  },
});

module.exports = model("Nota", NotaSchema);
