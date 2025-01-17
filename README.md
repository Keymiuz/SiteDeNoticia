# SiteDeNoticia
Um site totalmente responsivo feito com as tecnologias MERN Stack


# 🚀 Projeto MERN Stack - Blog Dinâmico com Busca Avançada e Posts Mais Lidos! 🚀

Este é um blog dinâmico e moderno, construído com a poderosa stack MERN (MongoDB, Express, React e Node.js). Ele foi projetado para ser escalável, eficiente e interativo, incorporando funcionalidades como busca avançada e exibição de posts mais lidos.

---

## 📝 Funcionalidades

- 🔍 Busca Avançada:** Pesquise posts pelo título de forma rápida e precisa, com resultados dinâmicos e intuitivos.
- 📈 Posts Mais Lidos:** Destaque para os posts mais visualizados, garantindo que o melhor conteúdo esteja sempre em evidência.
- 🔒 Banco de Dados MongoDB:** Armazenamento seguro e escalável para os dados dos posts.
- ⚡ API com Express e Node.js:** Backend robusto para lidar com a lógica do blog e comunicação com o banco de dados.
- 💻 Front-End Dinâmico com EJS:** Renderização moderna e fluida para os usuários.

---

🛠️ Tecnologias Utilizadas

- **MongoDB:** Banco de dados NoSQL para armazenar os dados do blog.
- **Express.js:** Framework para criar uma API backend eficiente.
- **Node.js:** Ambiente de execução do backend.
- **EJS:** Motor de templates para renderização dinâmica.
- **Mongoose:** ODM (Object Data Modeling) para integração entre o MongoDB e o Node.js.

---

🚀 Como Executar o Projeto Localmente

Siga estas etapas para rodar o projeto em sua máquina local.

 1️⃣ Pré-requisitos
- Node.js (v16 ou superior)
- MongoDB (pode ser local ou usando um cluster do MongoDB Atlas)

2️⃣ Clone o Repositório
bash
git clone (https://github.com/Keymiuz/SiteDeNoticia.git)
cd seu-repositorio

3️⃣ Instale as Dependências
- npm install express mongoose body-parser ejs ms

4️⃣  Inicie o Servidor
- npm start ou nodemon server..js



comentários adicionais: você pode trabalhar com sua própria porta local com o MONGO_URI, neste projeto eu rodo uma chave aleatória pq foi o jeito que eu fiz o MongoDB se conectar ao meu router,
mesmo seguindo a documentação oficial do site, eu encontrava alguns problemas de rota no meu terminal, então pra preferir evitar esses problemas eu decidi fazer a verificação no mesmo arquivo (sim, eu sei que isso pode comprometer a senha no futuro, mas como era um projeto pequeno só pra mostrar o MERN na prática, eu não estou me preocupando com isso agora).


segue o código original em anexo para você fazer as suas modificações de rota ou se baseie no meu que está no index.js: 
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://root:<db_password>@cluster0.51hbp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


