const { response, request } = require("express");
const { validationResult } = require("express-validator");
const Usuario = require("../models/usuario.js");
const bcrypt = require("bcrypt");
const { generarJWT } = require("../helpers/generarJWT.js");

const registroUsuario = async (req, res = response) => {
  const { body } = req;

  try {
    const { nombre, correo, password } = body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }

    const usuarioDB = await Usuario.findOne({ correo });

    if (usuarioDB) {
      return res.status(400).json({
        msg: `Ya existe un usuario con el correo ${correo}`,
      });
    }

    const usuario = new Usuario(body);
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();
    res.json({
      usuario,
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};

const loginUsuario = async (req = request, res = response) => {
  const { correo, password } = req.body;

  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }

    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({
        msg: `El correo: ${correo}, no existe en nuestra base de datos`,
      });
    }

    const pass = bcrypt.compareSync(password, usuario.password);
    if (!pass) {
      return res.status(400).json({
        msg: "Contraseña incorrecta",
      });
    }

    const token = await generarJWT(usuario._id);

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "Error",
    });
  }
};

module.exports = {
  registroUsuario,
  loginUsuario,
};
