
import { Router } from "express";

import {
  criarNotificacao,
  buscarNotificacoes,
  buscarNotificacaoPorIdController,
} from "../controllers/notificacoes.controller.js";

import { autenticarToken } from "../middlewares/autenticarToken.js";

import { autorizarAdministrador } from "../middlewares/autorizarAdministrador.js";

const router = Router();

// Consultar todas as notificações (acesso público)
router.get("/", buscarNotificacoes);

// Consultar uma notificação pelo ID (acesso público)
router.get("/:id", buscarNotificacaoPorIdController);

// Cadastrar notificação (somente administrador)
router.post(
  "/",
  autenticarToken,
  autorizarAdministrador,
  criarNotificacao
);

export default router;
