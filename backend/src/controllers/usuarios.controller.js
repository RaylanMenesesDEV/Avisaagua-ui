import { cadastrarUsuario } from "../services/usuarios.service.js";

export async function criarUsuario(req, res) {
  try {
    const usuario = await cadastrarUsuario(req.body);

    return res.status(201).json({
      mensagem: "Usuário cadastrado com sucesso!",
      usuario,
    });
  } catch (error) {
    if (
      error.message === "Todos os campos são obrigatórios." ||
      error.message === "CPF inválido." ||
      error.message === "E-mail inválido." ||
      error.message === "As senhas não coincidem." ||
      error.message === "E-mail ou CPF já cadastrado no sistema"
    ) {
      const status =
        error.message === "E-mail ou CPF já cadastrado no sistema"
          ? 409
          : 400;

      return res.status(status).json({
        mensagem: error.message,
      });
    }

    console.error("Erro ao cadastrar usuário:", error);

    return res.status(500).json({
      mensagem: "Erro interno do servidor.",
    });
  }
}