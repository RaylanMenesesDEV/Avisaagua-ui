
import { Router } from "express";

import {
  buscarAvisos,
  criarAviso,
  consultarAvisoPorId,
  editarAviso,
  finalizarAviso,
} from "../controllers/avisos.controller.js";

import { autenticarToken } from "../middlewares/autenticarToken.js";
import { autorizarAdministrador } from "../middlewares/autorizarAdministrador.js";

const router = Router();

// Listar todos os avisos (público)
router.get("/", buscarAvisos);

// Consultar um aviso pelo ID (público)
router.get("/:id", consultarAvisoPorId);

// Cadastrar um aviso (administrador)
router.post(
  "/",
  autenticarToken,
  autorizarAdministrador,
  criarAviso
);

// Editar um aviso (administrador)
router.put(
  "/:id",
  autenticarToken,
  autorizarAdministrador,
  editarAviso
);

// Encerrar um aviso (administrador)
router.patch(
  "/:id/encerrar",
  autenticarToken,
  autorizarAdministrador,
  finalizarAviso
);

export default router;
