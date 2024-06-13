const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController.js");

router.get("/", usuarioController.indexView);
router.get("/criar_conta", usuarioController.criarContaView);
router.post("/cadastrar_usuario", usuarioController.cadastrarUsuario);

module.exports = router;
