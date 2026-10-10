
import express from "express";
import cors from "cors";

import usuariosRoutes from "./routes/usuarios.routes.js";
import authRoutes from "./routes/auth.routes.js";
import orgaosRoutes from "./routes/orgaos.routes.js";

import avisosRoutes from "./routes/avisos.routes.js";
import feedbacksRoutes from "./routes/feedbacks.routes.js";
import notificacoesRoutes from "./routes/notificacoes.routes.js";


const app = express();

// Permitir requisições do frontend React
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// Permitir o recebimento de dados JSON
app.use(express.json());


// Rota principal
app.get("/", (req, res) => {
  return res.status(200).json({
    message: "API AvisaÁgua funcionando!",
  });
});

// Rota de cadastro de usuários
app.use("/api/usuarios", usuariosRoutes);

// Rota de autenticação
app.use("/api/auth", authRoutes);

// Rota de órgãos públicos
app.use("/api/orgaos", orgaosRoutes);

// Rota pública de avisos
app.use("/api/avisos", avisosRoutes);

// Rota de feedbacks
app.use("/api/feedbacks", feedbacksRoutes);

// Rota de notificações
app.use("/api/notificacoes", notificacoesRoutes);

export default app;
