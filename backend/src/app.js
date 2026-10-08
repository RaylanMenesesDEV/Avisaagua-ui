import express from "express";
import usuariosRoutes from "./routes/usuarios.routes.js";

const app = express();

// Permite receber dados em formato JSON
app.use(express.json());

// Rota inicial para verificar o funcionamento da API
app.get("/", (req, res) => {
  return res.status(200).json({
    message: "API AvisaÁgua funcionando!",
  });
});

// Rotas de usuários
app.use("/api/usuarios", usuariosRoutes);

export default app;