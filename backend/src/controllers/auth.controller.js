import { autenticarUsuario } from "../services/auth.service.js";

export async function login(req, res) {
  try {
    const { email, senha } = req.body ?? {};

    if (
      typeof email !== "string" ||
      typeof senha !== "string" ||
      !email.trim() ||
      !senha
    ) {
      return res.status(400).json({
        mensagem: "E-mail e senha são obrigatórios.",
      });
    }

    const resultado = await autenticarUsuario(email, senha);

    return res.status(200).json({
      mensagem: "Login realizado com sucesso!",
      token: resultado.token,
      usuario: resultado.usuario,
    });
  } catch (error) {
    if (error.message === "E-mail ou senha inválidos") {
      return res.status(401).json({
        mensagem: "E-mail ou senha inválidos",
      });
    }

    console.error("Erro ao realizar login:", error);

    return res.status(500).json({
      mensagem: "Erro interno do servidor.",
    });
  }
}