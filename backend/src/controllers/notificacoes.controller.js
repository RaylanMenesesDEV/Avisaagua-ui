import {
  cadastrarNotificacao,
  listarNotificacoes,
  buscarNotificacaoPorId,
} from "../services/notificacoes.service.js";


// Cadastrar uma nova notificação
export async function criarNotificacao(req, res) {
  try {
    const { mensagem, tipo, avisoId } = req.body ?? {};

    // Validar a mensagem
    if (
      typeof mensagem !== "string" ||
      mensagem.trim().length === 0
    ) {
      return res.status(400).json({
        mensagem: "A mensagem da notificação é obrigatória.",
      });
    }

    // Validar o tipo
    if (
      typeof tipo !== "string" ||
      tipo.trim().length === 0
    ) {
      return res.status(400).json({
        mensagem: "O tipo da notificação é obrigatório.",
      });
    }

    // Validar o ID do aviso
    if (!Number.isSafeInteger(avisoId) || avisoId <= 0) {
      return res.status(400).json({
        mensagem: "ID do aviso inválido.",
      });
    }

    // Salvar a notificação no banco de dados
    const novaNotificacao = await cadastrarNotificacao(
      mensagem.trim(),
      tipo.trim(),
      avisoId
    );

    return res.status(201).json({
      mensagem: "Notificação cadastrada com sucesso!",
      notificacao: novaNotificacao,
    });
  } catch (error) {
    // Aviso relacionado não encontrado
    if (error.code === "P2003") {
      return res.status(404).json({
        mensagem: "Aviso não encontrado.",
      });
    }

    console.error("Erro ao cadastrar notificação:", error);

    return res.status(500).json({
      mensagem: "Erro interno ao cadastrar notificação.",
    });
  }
}

// Consultar todas as notificações cadastradas
export async function buscarNotificacoes(req, res) {
  try {
    const notificacoes = await listarNotificacoes();

    return res.status(200).json({
      mensagem: "Notificações consultadas com sucesso!",
      total: notificacoes.length,
      notificacoes,
    });
  } catch (error) {
    console.error("Erro ao consultar notificações:", error);

    return res.status(500).json({
      mensagem: "Erro interno ao consultar notificações.",
    });
  }
}

// Consultar uma notificação específica pelo ID
export async function buscarNotificacaoPorIdController(req, res) {
  try {
    const id = Number(req.params.id);

    // Validar o ID informado na URL
    if (!Number.isSafeInteger(id) || id <= 0) {
      return res.status(400).json({
        mensagem: "ID da notificação inválido.",
      });
    }

    // Consultar a notificação no PostgreSQL
    const notificacao = await buscarNotificacaoPorId(id);

    // Verificar se a notificação existe
    if (!notificacao) {
      return res.status(404).json({
        mensagem: "Notificação não encontrada.",
      });
    }

    return res.status(200).json({
      mensagem: "Notificação consultada com sucesso!",
      notificacao,
    });
  } catch (error) {
    console.error("Erro ao consultar notificação:", error);

    return res.status(500).json({
      mensagem: "Erro interno ao consultar notificação.",
    });
  }
}
