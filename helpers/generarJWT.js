const jwt = require("jsonwebtoken");

const generarJWT = async (uid) => {
  const payload = { uid };
  try {
    const token = jwt.sign(payload, process.env.SECRETKEY, { expiresIn: "4h" });
    return token;
  } catch (error) {
    console.log("Error al generar el token");
  }
};

module.exports = {
  generarJWT,
};
