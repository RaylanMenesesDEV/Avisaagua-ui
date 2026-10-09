
import prisma from "../lib/prisma.js";

// Listar todos os avisos públicos
export async function listarAvisos() {
  return prisma.aviso.findMany({
    include: {
      orgao: {
        select: {
          id: true,
          nome: true,
          tipoServico: true,
        },
      },
    },
    orderBy: {
      dataPublicacao: "desc",
    },
  });
}

// Cadastrar um novo aviso público
export async function cadastrarAviso(dados) {
  const {
    titulo,
    descricao,
    categoria,
    dataPrevistaRetorno,
    orgaoId,
  } = dados;

  return prisma.aviso.create({
    data: {
      titulo,
      descricao,
      categoria,
      dataPrevistaRetorno,
      orgaoId,
    },
    include: {
      orgao: {
        select: {
          id: true,
          nome: true,
          tipoServico: true,
        },
      },
    },
  });
}

 // Buscar um aviso público pelo ID
export async function buscarAvisoPorId(id) {
  return prisma.aviso.findUnique({
    where: {
      id,
    },
    include: {
      orgao: {
        select: {
          id: true,
          nome: true,
          tipoServico: true,
        },
      },
    },
  });
}

// Atualizar um aviso público existente
export async function atualizarAviso(id, dados) {
  return prisma.aviso.update({
    where: {
      id,
    },
    data: dados,
    include: {
      orgao: {
        select: {
          id: true,
          nome: true,
          tipoServico: true,
        },
      },
    },
  });
}

 // Encerrar um aviso público
export async function encerrarAviso(id) {
  return prisma.aviso.update({
    where: {
      id,
    },
    data: {
      status: "ENCERRADO",
    },
    include: {
      orgao: {
        select: {
          id: true,
          nome: true,
          tipoServico: true,
        },
      },
    },
  });
}
