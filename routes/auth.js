const { Router } = require("express");
const { check } = require("express-validator");
const { registroUsuario, loginUsuario } = require("../controllers/auth");

const router = Router();

router.post(
  "/register",
  [
    check("nombre", "El nombre debe ser obligatorio").not().isEmpty(),
    check("correo", "El email es incorrecto").isEmail(),
    check("password", "Debe tener al menos 6 caracteres").isLength({ min: 6 }),
  ],
  registroUsuario
);
router.post(
  "/login",
  [
    check("correo", "El correo debe ser obligatorio").not().isEmpty(),
    check("password", "El password debe tener al menos 6 caracteres").isLength({
      min: 6,
    }),
  ],
  loginUsuario
);

module.exports = router;
