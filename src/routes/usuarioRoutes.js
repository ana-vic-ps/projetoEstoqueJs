const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController.js");
const autenticacaoController = require("../controllers/autenticacaoController.js");

router.get("/", usuarioController.indexView);
router.get("/criar_conta", usuarioController.criarContaView);
router.post("/cadastrar_usuario", usuarioController.cadastrarUsuario);
router.get("/editar_usuario", autenticacaoController.verificarAutenticacao, usuarioController.editarUsuarioView);
router.post("/editar_usuario", autenticacaoController.verificarAutenticacao, usuarioController.editarUsuario);

module.exports = router;
