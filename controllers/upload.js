const { response } = require("express");
const Usuario = require("../models/usuario");

const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const subirImagenUsuario = async (req, res = response) => {
  const { tempFilePath } = req.files.archivo;
  const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

  const { id } = req.params;

  const usuarioDB = await Usuario.findById(id);
  usuarioDB.img = secure_url;
  await usuarioDB.save();
  res.json({
    usuarioDB,
  });
};

module.exports = {
  subirImagenUsuario,
};
