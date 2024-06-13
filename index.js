const express = require("express");
const session = require("express-session");
const app = express();
const db = require("./src/db");
const mustacheExpress = require("mustache-express");

// Middleware setup
app.engine("html", mustacheExpress());
app.set("view engine", "html");
app.set("views", __dirname + "/src/views");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "secret-token",
    name: "sessionId",
    resave: false,
    saveUninitialized: false,
  })
);

db.sync(function () {
  console.log("Banco de Dados conectado");
});

// Routes
app.use("/", require("./src/routes/usuarioRoutes"));
app.use("/", require("./src/routes/produtoRoutes"));
app.use("/", require("./src/routes/autenticacaoRoutes"));

const PORT = 8080;
app.listen(PORT, function () {
  console.log(`App rodando na porta ${PORT}`);
});
