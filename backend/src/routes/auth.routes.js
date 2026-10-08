import { Router } from "express";
import { login } from "../controllers/auth.controller.js";
import { autenticarToken } from "../middlewares/autenticarToken.js";
import { autorizarAdministrador } from "../middlewares/autorizarAdministrador.js";

const router = Router();

// Rota pública de login
router.post("/login", login);

// Rota protegida para usuários autenticados
router.get("/me", autenticarToken, (req, res) => {
  return res.status(200).json({
    mensagem: "Token validado com sucesso!",
    usuario: req.usuario,
  });
});

// Rota exclusiva para administradores
router.get(
  "/admin",
  autenticarToken,
  autorizarAdministrador,
  (req, res) => {
    return res.status(200).json({
      mensagem: "Acesso administrativo autorizado!",
      usuario: req.usuario,
    });
  }
);

export default router;