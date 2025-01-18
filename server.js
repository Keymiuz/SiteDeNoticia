const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

// Inicializa o Express
const app = express();

// Carrega o modelo de Posts
const Posts = require("./Posts.js");

// Conecta ao MongoDB usando Mongoose (com tratamento de erro aprimorado)
const uri =
  "mongodb+srv://root:4WC0ODdKsFNpy6rZ@cluster0.51hbp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conectado com sucesso ao MongoDB!"))
  .catch((err) => {
    console.error("Erro crítico ao conectar com o MongoDB:", err);
    process.exit(1); // Encerra o processo em caso de falha na conexão
  });

// Middlewares
app.use(express.json()); // Use express.json()
app.use(express.urlencoded({ extended: true })); // Use express.urlencoded()
//Removi bodyParser pois ja estou utilizando o express.json e express.urlencoded

// Configuração de EJS como view engine
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

// Definindo a pasta para os arquivos estáticos
app.use("/public", express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "/pages/pages"));

// Rota principal (Página inicial) - Agora usando async/await
app.get("/", async (req, res) => {
  try {
    let posts;
    if (req.query.busca) {
      const buscaQuery = req.query.busca;
      posts = await Posts.find({
        titulo: { $regex: buscaQuery, $options: "i" },
      });
      res.render("busca", { posts, contagem: posts.length });
      return; // Importante para evitar que o código continue executando
    } else {
      posts = await Posts.find({}).sort({ _id: -1 });
    }

    const postsFormatados = posts.map((val) => ({
      titulo: val.titulo,
      conteudo: val.conteudo,
      descricaoCurta: val.conteudo.substring(0, 100), // Usando substring para evitar erros
      imagem: val.imagem,
      slug: val.slug,
      categoria: val.categoria,
    }));

    const postsTop = await Posts.find({}).sort({ views: -1 }).limit(3);
    const postsTopFormatados = postsTop.map((val) => ({
      titulo: val.titulo,
      conteudo: val.conteudo,
      descricaoCurta: val.conteudo.substring(0, 100),
      imagem: val.imagem,
      slug: val.slug,
      categoria: val.categoria,
      views: val.views,
    }));
    res.render("home", {
      posts: postsFormatados,
      postsTop: postsTopFormatados,
    });
  } catch (err) {
    console.error("Erro ao processar a rota principal:", err);
    res.status(500).send("Erro ao processar a requisição");
  }
});

// Rota para exibir um único post com base no slug - Agora usando async/await
app.get("/:slug", async (req, res) => {
  try {
    const resposta = await Posts.findOneAndUpdate(
      { slug: req.params.slug },
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!resposta) {
      return res.redirect("/");
    }

    const postsTop = await Posts.find({}).sort({ views: -1 }).limit(3);
    const postsTopFormatados = postsTop.map((val) => ({
      titulo: val.titulo,
      conteudo: val.conteudo,
      descricaoCurta: val.conteudo.substring(0, 100),
      imagem: val.imagem,
      slug: val.slug,
      categoria: val.categoria,
      views: val.views,
    }));

    res.render("single", { noticia: resposta, postsTop: postsTopFormatados });
  } catch (err) {
    console.error("Erro ao processar o post:", err);
    res.status(500).send("Erro ao processar a requisição");
  }
});

// Inicia o servidor na porta 8000
app.listen(8000, () => {
  console.log("Servidor rodando na porta 8000!");
});
