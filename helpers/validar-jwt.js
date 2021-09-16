const { response } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

const validarJWT = async (req, res = response, next) => {
  try {
    const token = req.header("x-token");

    if (!token) {
      return res.status(400).json({
        msg: "No hay token en la peticion",
      });
    }
    const { uid } = jwt.verify(token, process.env.SECRETKEY);
    const usuario = await Usuario.findById(uid);

    if (!usuario) {
      return res.status(400).json({
        msg: "No existe un usuario con ese token, o el token expiro",
      });
    }
    req.usuario = usuario;
    next();
  } catch (error) {
    res.status(500).json({
      msg: "ERROR, hable con el administrador",
    });
  }
};

module.exports = validarJWT;
