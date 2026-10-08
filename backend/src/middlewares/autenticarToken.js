import jwt from "jsonwebtoken";

export function autenticarToken(req, res, next) {
  const autorizacao = req.headers.authorization;

  if (!autorizacao || !/^Bearer\s+\S+$/i.test(autorizacao)) {
    return res.status(401).json({
      mensagem: "Token de autenticação não fornecido.",
    });
  }

  const token = autorizacao.split(/\s+/)[1];

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET não configurado.");
    }

    const dados = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ["HS256"],
    });

    if (
      !dados ||
      typeof dados !== "object" ||
      !Number.isInteger(dados.id) ||
      !["CIDADAO", "ADMINISTRADOR"].includes(dados.tipoUsuario)
    ) {
      return res.status(401).json({
        mensagem: "Token inválido.",
      });
    }

    req.usuario = {
      id: dados.id,
      tipoUsuario: dados.tipoUsuario,
    };

    next();
  } catch (error) {
    if (error.message === "JWT_SECRET não configurado.") {
      console.error("Erro de configuração JWT:", error.message);

      return res.status(500).json({
        mensagem: "Erro interno do servidor.",
      });
    }

    return res.status(401).json({
      mensagem: "Token inválido ou expirado.",
    });
  }
}