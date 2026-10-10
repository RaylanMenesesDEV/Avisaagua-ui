import {
  cadastrarFeedback,
  listarFeedbacksDoUsuario,
  listarTodosFeedbacks,
  responderFeedback,
} from "../services/feedbacks.service.js";


// Cadastrar feedback de um usuário autenticado
export async function criarFeedback(req, res) {
  try {
    const { mensagem, tipo } = req.body ?? {};

    const usuarioId = req.usuario?.id;

    // Validar a mensagem
    if (
      typeof mensagem !== "string" ||
      mensagem.trim().length === 0
    ) {
      return res.status(400).json({
        mensagem: "A mensagem do feedback é obrigatória.",
      });
    }

    // Validar o tipo de feedback
    const tiposPermitidos = ["PROBLEMA", "SUGESTAO", "ELOGIO"];

    if (!tiposPermitidos.includes(tipo)) {
      return res.status(400).json({
        mensagem: "Tipo de feedback inválido.",
      });
    }

    // Verificar autenticação
    if (!Number.isSafeInteger(usuarioId) || usuarioId <= 0) {
      return res.status(401).json({
        mensagem: "Usuário não autenticado.",
      });
    }

    // Cadastrar feedback no PostgreSQL
    const novoFeedback = await cadastrarFeedback(
      mensagem.trim(),
      usuarioId,
      tipo
    );

    return res.status(201).json({
      mensagem: "Feedback cadastrado com sucesso!",
      feedback: novoFeedback,
    });
  } catch (error) {
    if (error.code === "P2003") {
      return res.status(401).json({
        mensagem: "Usuário não encontrado ou inválido.",
      });
    }

    console.error("Erro ao cadastrar feedback:", error);
    console.error("Nome do erro:", error.name);
    console.error("Código do erro:", error.code);
    console.error("Mensagem do erro:", error.message);

    return res.status(500).json({
      mensagem: "Erro interno ao cadastrar feedback.",
    });
  }
}

// Consultar feedbacks do usuário autenticado
export async function buscarMeusFeedbacks(req, res) {
  try {
    // Identificar o usuário pelo token JWT
    const usuarioId = req.usuario?.id;

    // Verificar se o usuário está autenticado
    if (!Number.isSafeInteger(usuarioId) || usuarioId <= 0) {
      return res.status(401).json({
        mensagem: "Usuário não autenticado.",
      });
    }

    // Consultar os feedbacks do usuário
    const feedbacks = await listarFeedbacksDoUsuario(usuarioId);

    return res.status(200).json({
      mensagem: "Feedbacks consultados com sucesso!",
      total: feedbacks.length,
      feedbacks,
    });
  } catch (error) {
    console.error("Erro ao consultar feedbacks:", error);

    return res.status(500).json({
      mensagem: "Erro interno ao consultar feedbacks.",
    });
  }
}

// Consultar todos os feedbacks (administração)
export async function buscarTodosFeedbacks(req, res) {
  try {
    // Consultar todos os feedbacks cadastrados
    const feedbacks = await listarTodosFeedbacks();

    return res.status(200).json({
      mensagem: "Todos os feedbacks consultados com sucesso!",
      total: feedbacks.length,
      feedbacks,
    });
  } catch (error) {
    console.error("Erro ao consultar todos os feedbacks:", error);

    return res.status(500).json({
      mensagem: "Erro interno ao consultar feedbacks.",
    });
  }
}

export async function marcarFeedbackComoRespondido(req, res) {
  try {
    const id = Number(req.params.id);

    // Validar o ID informado na URL
    if (!Number.isSafeInteger(id) || id <= 0) {
      return res.status(400).json({
        mensagem: "ID do feedback inválido.",
      });
    }

    // Atualizar o status no banco de dados
    const feedback = await responderFeedback(id);

    return res.status(200).json({
      mensagem: "Feedback marcado como respondido com sucesso!",
      feedback,
    });
  } catch (error) {
    // O Prisma retorna P2025 quando o registro não existe
    if (error.code === "P2025") {
      return res.status(404).json({
        mensagem: "Feedback não encontrado.",
      });
    }

    console.error("Erro ao responder feedback:", error);

    return res.status(500).json({
      mensagem: "Erro interno ao atualizar o feedback.",
    });
  }
}
