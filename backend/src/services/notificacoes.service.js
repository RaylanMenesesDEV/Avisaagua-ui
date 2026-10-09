
import prisma from "../lib/prisma.js";

// Cadastrar uma notificação vinculada a um aviso
export async function cadastrarNotificacao(
  mensagem,
  tipo,
  avisoId
) {
  return prisma.notificacao.create({
    data: {
      mensagem,
      tipo,
      avisoId,
    },
    select: {
      id: true,
      mensagem: true,
      tipo: true,
      dataEnvio: true,
      avisoId: true,
      criadoEm: true,
    },
  });
}

export async function listarNotificacoes() {
  return prisma.notificacao.findMany({
    select: {
      id: true,
      mensagem: true,
      tipo: true,
      dataEnvio: true,
      avisoId: true,
      criadoEm: true,
    },
    orderBy: {
      dataEnvio: "desc",
    },
  });
}

export async function buscarNotificacaoPorId(id) {
  return prisma.notificacao.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      mensagem: true,
      tipo: true,
      dataEnvio: true,
      avisoId: true,
      criadoEm: true,
    },
  });
}
