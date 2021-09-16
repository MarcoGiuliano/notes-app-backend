const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../db/config");
const fileUpload = require("express-fileupload");

class Server {
  constructor() {
    this.app = express();
    this.pathAuth = "/api/auth";
    this.pathUsuario = "/api/usuarios";
    this.pathUpload = "/api/uploads";
    this.pathNotas = "/api/notas";
    this.connectionDb();
    this.middlewares();
    this.routes();
  }

  async connectionDb() {
    await dbConnection();
  }
  middlewares() {
    this.app.use(express.static("public"));
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
      })
    );
  }

  routes() {
    this.app.use(this.pathAuth, require("../routes/auth"));
    this.app.use(this.pathUsuario, require("../routes/usuario"));
    this.app.use(this.pathUpload, require("../routes/upload"));
    this.app.use(this.pathNotas, require("../routes/nota"));
  }

  listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`Servidor corriendo en el puerto : ${process.env.PORT}`);
    });
  }
}

module.exports = Server;
