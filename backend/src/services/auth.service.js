import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

export async function autenticarUsuario(email, senha) {
  const emailNormalizado = email.trim().toLowerCase();

  const usuario = await prisma.usuario.findUnique({
    where: { email: emailNormalizado },
  });

  if (!usuario) {
    throw new Error("E-mail ou senha inválidos");
  }

  const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

  if (!senhaCorreta) {
    throw new Error("E-mail ou senha inválidos");
  }

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET não configurado.");
  }

  const token = jwt.sign(
    {
      id: usuario.id,
      tipoUsuario: usuario.tipoUsuario,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
      algorithm: "HS256",
    }
  );

  return {
    token,
    usuario: {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      tipoUsuario: usuario.tipoUsuario,
    },
  };
}