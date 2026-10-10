
import prisma from "../lib/prisma.js";

// Cadastrar um novo feedback
export async function cadastrarFeedback(mensagem, usuarioId, tipo) {
  return prisma.feedback.create({
    data: {
      mensagem,
      usuarioId,
      tipo,
    },
    select: {
      id: true,
      mensagem: true,
      tipo: true,
      dataEnvio: true,
      status: true,
      usuarioId: true,
      criadoEm: true,
      atualizadoEm: true,
    },
  });
}

// Listar os feedbacks do usuário autenticado
export async function listarFeedbacksDoUsuario(usuarioId) {
  return prisma.feedback.findMany({
    where: {
      usuarioId,
    },
    select: {
      id: true,
      mensagem: true,
      tipo: true,
      dataEnvio: true,
      status: true,
      usuarioId: true,
      criadoEm: true,
      atualizadoEm: true,
    },
    orderBy: {
      dataEnvio: "desc",
    },
  });
}

// Listar todos os feedbacks para a administração
export async function listarTodosFeedbacks() {
  return prisma.feedback.findMany({
    select: {
      id: true,
      mensagem: true,
      tipo: true,
      dataEnvio: true,
      status: true,
      usuarioId: true,
      usuario: {
        select: {
          id: true,
          nome: true,
          email: true,
        },
      },
      criadoEm: true,
      atualizadoEm: true,
    },
    orderBy: {
      dataEnvio: "desc",
    },
  });
}

export async function responderFeedback(id) {
  return prisma.feedback.update({
    where: {
      id,
    },
    data: {
      status: "RESPONDIDO",
    },
    select: {
      id: true,
      mensagem: true,
      tipo: true,
      dataEnvio: true,
      status: true,
      usuarioId: true,
      criadoEm: true,
      atualizadoEm: true,
    },
  });
}
