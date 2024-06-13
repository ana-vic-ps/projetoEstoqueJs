const express = require("express");
const router = express.Router();
const produtoController = require("../controllers/produtoController.js");
const autenticacaoController = require("../controllers/autenticacaoController.js");

router.get("/home", autenticacaoController.verificarAutenticacao, produtoController.homeView);
router.post("/cadastrar_produto", autenticacaoController.verificarAutenticacao, produtoController.cadastrarProduto);
router.get('/editar_produto/:id', autenticacaoController.verificarAutenticacao, produtoController.buscarProduto);
router.post('/editar_produto/:id', autenticacaoController.verificarAutenticacao, produtoController.editarProduto);
router.post('/excluir_produto/:id', autenticacaoController.verificarAutenticacao, produtoController.excluirProduto);

module.exports = router;
