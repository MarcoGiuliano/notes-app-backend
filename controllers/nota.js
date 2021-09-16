const { response } = require("express");
const { validationResult } = require("express-validator");
const { findById } = require("../models/nota");
const Nota = require("../models/nota");

const traerNotas = async (req, res = response) => {
  const condicion = { estado: true };

  const notas = await Nota.find(condicion);

  res.json({
    notas,
  });
};

const traerNotaId = async (req, res = response) => {
  const { id } = req.params;

  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }

    const nota = await Nota.findById(id).populate("usuario");

    if (!nota) {
      return res.status(400).json({
        msg: `No existe una nota con el id ${id}`,
      });
    }

    res.json({
      nota,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "ERROR, hable con el administrador",
    });
  }
};

const crearNota = async (req, res = response) => {
  const { titulo, descripcion } = req.body;

  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }
    const data = {
      titulo,
      descripcion,
      usuario: req.usuario._id,
    };

    const nota = await new Nota(data);

    await nota.save();

    res.json({
      nota,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "Error, hable con el administrador",
    });
  }
};

const actualizarNota = async (req, res = response) => {
  const { id } = req.params;

  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }
    const { estado, usuario, ...data } = req.body;
    const nota = await Nota.findByIdAndUpdate(id, data, { new: true });

    if (!nota) {
      return res.status(400).json({
        msg: `No existe una nota con el  id ${id}`,
      });
    }

    res.json({
      nota,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const eliminarNota = async (req, res = response) => {
  const { id } = req.params;
  const condicion = { estado: false };

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }
    const nota = await Nota.findByIdAndUpdate(id, condicion, { new: true });

    if (!nota) {
      return res.status(400).json({
        msg: `No existe una nota con el id ${id}`,
      });
    }
    res.json({
      nota,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  traerNotas,
  traerNotaId,
  crearNota,
  actualizarNota,
  eliminarNota,
};
