const { where } = require("sequelize");
const Usuario = require("../models/usuario");

async function autenticar(req, res) {
  const usuario = await Usuario.findOne({
    where: {
      email: req.body.email,
      senha: req.body.senha,
    },
  });
  if (usuario != null) {
    req.session.autorizado = true;
    req.session.usuario = usuario;
    res.redirect("/home");
  } else {
    let erro_autenticacao = true;
    res.render("index.html", { erro_autenticacao });
  }
}

function sair(req, res) {
  req.session.destroy();
  res.redirect("/");
}

function verificarAutenticacao(req, res, next) {
  if (req.session.autorizado) {
    console.log("usuario autorizado");
    next();
  } else {
    console.log("usuario não autorizado");
    res.redirect('/');
  }
}

module.exports = {
  autenticar,
  sair,
  verificarAutenticacao
};
