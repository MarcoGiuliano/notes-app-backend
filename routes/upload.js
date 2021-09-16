const { Router } = require("express");
const { subirImagenUsuario } = require("../controllers/upload");
const validarJWT = require("../helpers/validar-jwt");

const router = Router();

router.put("/:id", validarJWT, subirImagenUsuario);

module.exports = router;
