const Produto = require("../models/produto");
const { where } = require("sequelize");

function homeView(req, res) {
  Produto.findAll({
    where: {
      id_usuario: req.session.usuario.id,
    },
  })
    .then((produto) => {
      res.render("home.html", {
        produto,
        nome_usuario: req.session.usuario.nome,
      });
    })
    .catch((err_recuperar_produto) => {
      res.render("home.html", { err_recuperar_produto });
    });
}

function cadastrarProduto(req, res) {
  console.log(req.body);
  let produto = {
    id_usuario: req.session.usuario.id,
    nome_usuario: req.session.usuario.nome,
    nome_produto: req.body.nome_produto,
    descricao: req.body.descricao,
    quantidade: req.body.quantidade,
  };
  Produto.create(produto)
    .then(() => {
      let sucesso = true;
      res.redirect("/home");
    })
    .catch((err) => {
      console.log(err);
      let erro_cadastrar_anotacao = true;
      res.render("home.html", { erro_cadastrar_anotacao });
    });
}

function buscarProduto(req, res) {
  Produto.findByPk(req.params.id)
    .then((produto) => {
      res.render(console.log("achei o produto"));
    })
    .catch((err_recuperar_produto) => {
      res.render(console.log(err_recuperar_produto));
    });
}

function editarProduto(req, res) {
  Produto.update(
    {
      nome_produto: req.body.nome_produto,
      descricao: req.body.descricao,
      quantidade: req.body.quantidade,
    },
    {
      where: {
        id: req.params.id,
        id_usuario: req.session.usuario.id,
      },
    }
  )
    .then(() => {
      res.redirect("/home");
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/home?erro_editar_produto=true");
    });
}

function excluirProduto(req, res) {
  Produto.destroy({
    where: {
      id: req.params.id,
      id_usuario: req.session.usuario.id,
    },
  })
    .then(() => {
      res.redirect("/home");
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/home?erro_excluir_produto=true");
    });
}

module.exports = {
  homeView,
  cadastrarProduto,
  buscarProduto,
  editarProduto,
  excluirProduto,
};
