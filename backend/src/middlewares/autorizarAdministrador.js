import prisma from "../lib/prisma.js";

export async function autorizarAdministrador(req, res, next) {
  if (!req.usuario) {
    return res.status(401).json({
      mensagem: "Usuário não autenticado.",
    });
  }

  try {
    const usuario = await prisma.usuario.findUnique({
      where: {
        id: req.usuario.id,
      },
      select: {
        id: true,
        tipoUsuario: true,
      },
    });

    if (!usuario) {
      return res.status(401).json({
        mensagem: "Usuário não encontrado.",
      });
    }

    if (usuario.tipoUsuario !== "ADMINISTRADOR") {
      return res.status(403).json({
        mensagem: "Acesso permitido apenas para administradores.",
      });
    }

    next();
  } catch (error) {
    console.error("Erro ao verificar administrador:", error);

    return res.status(500).json({
      mensagem: "Erro interno do servidor.",
    });
  }
}