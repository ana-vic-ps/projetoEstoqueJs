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

function editarUsuarioView(req, res) {
  Usuario.findByPk(req.session.usuario.id)
    .then((usuario) => {
      res.render("editar_usuario.html", { usuario });
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/?erro_carregar_usuario=true");
    });
}

function editarUsuario(req, res) {
  Usuario.update(
    {
      nome: req.body.nome ? req.body.nome : req.session.usuario.nome,
      email: req.body.email ? req.body.email : req.session.usuario.email,
      senha: req.body.senha ? req.body.senha : req.session.usuario.senha,
    },
    {
      where: {
        id: req.session.usuario.id,
      },
    }
  )
    .then(() => {
      // Update session information
      if (req.body.nome) req.session.usuario.nome = req.body.nome;
      if (req.body.email) req.session.usuario.email = req.body.email;
      if (req.body.senha) req.session.usuario.senha = req.body.senha;

      res.redirect("/home");
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/?erro_editar_usuario=true");
    });
}

module.exports = {
  indexView,
  criarContaView,
  cadastrarUsuario,
  editarUsuarioView,
  editarUsuario,
};
