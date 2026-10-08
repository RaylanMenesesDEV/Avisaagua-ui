import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import { validarCpf } from "../utils/validarCpf.js";
import { validarEmail } from "../utils/validarEmail.js";

export async function cadastrarUsuario(dados) {
  const { nome, cpf, email, senha, confirmarSenha } = dados;

  if (!nome || !cpf || !email || !senha || !confirmarSenha) {
  throw new Error("Todos os campos são obrigatórios.");
}

if (senha !== confirmarSenha) {
  throw new Error("As senhas não coincidem.");
}

  const emailNormalizado = email.trim().toLowerCase();
  if (!validarEmail(emailNormalizado)) {
  throw new Error("E-mail inválido.");
}
  const cpfNormalizado = cpf.replace(/\D/g, "");
  if (!validarCpf(cpfNormalizado)) {
  throw new Error("CPF inválido.");
}

  const usuarioExistente = await prisma.usuario.findFirst({
    where: {
      OR: [
        { email: emailNormalizado },
        { cpf: cpfNormalizado },
      ],
    },
  });

  if (usuarioExistente) {
    throw new Error("E-mail ou CPF já cadastrado no sistema");
  }

  const senhaHash = await bcrypt.hash(senha, 12);

  const usuario = await prisma.usuario.create({
    data: {
      nome: nome.trim(),
      cpf: cpfNormalizado,
      email: emailNormalizado,
      senha: senhaHash,
      tipoUsuario: "CIDADAO",
    },
    select: {
      id: true,
      nome: true,
      email: true,
      tipoUsuario: true,
      criadoEm: true,
    },
  });

  return usuario;
}