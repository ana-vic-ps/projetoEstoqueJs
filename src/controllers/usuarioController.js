const Usuario = require("../models/usuario");

function indexView(req, res) {
  res.render("index.html");
}

function criarContaView(req, res) {
  res.render("cadastro_usuario.html");
}

function cadastrarUsuario(req, res) {
  let usuario = {
    nome: req.body.nome,
    email: req.body.email,
    senha: req.body.senha,
  };

  Usuario.create(usuario)
    .then(() => {
      let sucesso = true;
      res.render("index.html", { sucesso });
      // res.redirect("/?cadastrar_usuario=true");
    })
    .catch((err) => {
      console.log(err);
      let erro = true;
      res.render("cadastro_usuario.html", { erro });
    });
}

module.exports = {
  indexView,
  criarContaView,
  cadastrarUsuario,
};
