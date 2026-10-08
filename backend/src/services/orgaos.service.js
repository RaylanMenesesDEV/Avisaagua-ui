
import prisma from "../lib/prisma.js";

// Listar todos os órgãos públicos
export async function listarOrgaos() {
  return prisma.orgao.findMany({
    orderBy: {
      nome: "asc",
    },
  });
}

// Cadastrar um novo órgão público
export async function cadastrarOrgao(dados) {
  const {
    nome,
    tipoServico,
    telefone,
    email,
    endereco,
  } = dados;

  const novoOrgao = await prisma.orgao.create({
    data: {
      nome,
      tipoServico,
      telefone,
      email,
      endereco,
    },
  });

  return novoOrgao;
}
