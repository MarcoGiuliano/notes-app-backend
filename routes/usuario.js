const { Router } = require("express");
const { check } = require("express-validator");
const {
  traerUsuarios,
  traerUsuarioId,
  actualizarUsuario,
  eliminarUsuario,
} = require("../controllers/usuario");
const validarJWT = require("../helpers/validar-jwt");

const router = Router();

router.get("/", validarJWT, traerUsuarios);
router.get(
  "/:id",
  validarJWT,
  [check("id", "El id, no es un id de mongo").isMongoId()],
  traerUsuarioId
);
router.put(
  "/:id",
  validarJWT,
  [check("id", "El id, no es un id de mongo").isMongoId()],
  actualizarUsuario
);
router.delete(
  "/:id",
  validarJWT,
  [check("id", "El id, no es un id de mongo").isMongoId()],
  eliminarUsuario
);

module.exports = router;
