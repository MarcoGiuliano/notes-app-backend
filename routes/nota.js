const { Router } = require("express");
const { check } = require("express-validator");
const {
  traerNotas,
  traerNotaId,
  crearNota,
  actualizarNota,
  eliminarNota,
} = require("../controllers/nota");
const validarJWT = require("../helpers/validar-jwt");

const router = Router();

router.get("/", validarJWT, traerNotas);
router.get(
  "/:id",
  [validarJWT, check("id", "El id, no es un id de mongo").isMongoId()],
  traerNotaId
);
router.post(
  "/",
  [
    validarJWT,
    check("titulo", "El titulo es requerido").not().isEmpty(),
    check("descripcion", "La descripcion es requerida").not().isEmpty(),
  ],
  crearNota
);
router.put(
  "/:id",
  [validarJWT, check("id", "El id, no es un id de mongo").isMongoId()],
  actualizarNota
);
router.delete(
  "/:id",
  [validarJWT, check("id", "El id, no es un id de mongo").isMongoId()],
  eliminarNota
);

module.exports = router;
