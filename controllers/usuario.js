const { response } = require("express");
const { validationResult } = require("express-validator");
const Usuario = require("../models/usuario");

const traerUsuarios = async (req, res = response) => {
  const condicion = { estado: true };

  const usuario = await Usuario.findOne(condicion);

  res.json({
    usuario,
  });
};

const traerUsuarioId = async (req, res = response) => {
  const { id } = req.params;

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }

    const usuario = await Usuario.findById(id);

    if (!usuario) {
      return res.status(400).json({
        msg: `No existe un usuario con el id ${id}`,
      });
    }

    res.json({
      usuario,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "Error, hable con el admininistrador",
    });
  }
};

const actualizarUsuario = async (req, res = response) => {
  const { id } = req.params;
  const { correo, estado, uid, ...data } = req.body;

  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, data, { new: true });

    if (!usuario) {
      return res.status(400).json({
        msg: `No existe un usuario con el id ${id}`,
      });
    }

    res.json({
      usuario,
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};

const eliminarUsuario = async (req, res = response) => {
  const { id } = req.params;
  const condicion = { estado: false };

  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }
    const usuario = await Usuario.findByIdAndUpdate(id, condicion, {
      new: true,
    });

    if (!usuario) {
      return res.status(400).json({
        msg: `No existe un usuario con el id: ${id}`,
      });
    }

    res.json({
      usuario,
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = {
  traerUsuarioId,
  traerUsuarios,
  actualizarUsuario,
  eliminarUsuario,
};
