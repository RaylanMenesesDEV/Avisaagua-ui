import { Router } from "express";
import { criarUsuario } from "../controllers/usuarios.controller.js";

const router = Router();

router.post("/", criarUsuario);

export default router;