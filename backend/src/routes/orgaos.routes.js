
import { Router } from "express";

import {
  buscarOrgaos,
  criarOrgao,
} from "../controllers/orgaos.controller.js";


import { autenticarToken } from "../middlewares/autenticarToken.js";
import { autorizarAdministrador } from "../middlewares/autorizarAdministrador.js";


const router = Router();

// Rota pública: listar órgãos
router.get("/", buscarOrgaos);

// Rota protegida: cadastrar órgão
router.post(
  "/",
  autenticarToken,
  autorizarAdministrador,
  criarOrgao
);

export default router;
