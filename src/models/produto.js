const Sequelize = require("sequelize");
const db = require("../db");

const Produto = db.define("produto", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  id_usuario: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  nome_usuario: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  nome_produto: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  descricao: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  quantidade: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Produto;
