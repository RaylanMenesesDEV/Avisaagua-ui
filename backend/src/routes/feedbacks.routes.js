
import { Router } from "express";

import {
  criarFeedback,
  buscarMeusFeedbacks,
  buscarTodosFeedbacks,
  marcarFeedbackComoRespondido,
} from "../controllers/feedbacks.controller.js";

import { autenticarToken } from "../middlewares/autenticarToken.js";

import { autorizarAdministrador } from "../middlewares/autorizarAdministrador.js";

const router = Router();

// Cadastrar feedback (usuário autenticado)
router.post("/", autenticarToken, criarFeedback);

// Consultar os próprios feedbacks
router.get("/meus", autenticarToken, buscarMeusFeedbacks);

// Consultar todos os feedbacks (somente administrador)
router.get(
  "/",
  autenticarToken,
  autorizarAdministrador,
  buscarTodosFeedbacks
);

// Marcar feedback como respondido (somente administrador)
router.patch(
  "/:id/responder",
  autenticarToken,
  autorizarAdministrador,
  marcarFeedbackComoRespondido
);

export default router;
