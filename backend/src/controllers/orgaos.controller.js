
import {
  listarOrgaos,
  cadastrarOrgao,
} from "../services/orgaos.service.js";

// Listar órgãos públicos
export async function buscarOrgaos(req, res) {
  try {
    const orgaos = await listarOrgaos();

    return res.status(200).json({
      mensagem: "Órgãos consultados com sucesso!",
      total: orgaos.length,
      orgaos,
    });
  } catch (error) {
    console.error("Erro ao listar órgãos:", error);

    return res.status(500).json({
      mensagem: "Erro interno do servidor.",
    });
  }
}

// Cadastrar órgão público
export async function criarOrgao(req, res) {
  try {
    const { nome, tipoServico, telefone, email, endereco } = req.body;

    // Verificar campos obrigatórios
    const campos = { nome, tipoServico, telefone, email, endereco };

    const dadosInvalidos = Object.values(campos).some(
      (valor) => typeof valor !== "string" || !valor.trim()
    );

    if (dadosInvalidos) {
      return res.status(400).json({
        mensagem: "Todos os campos são obrigatórios e devem ser textos válidos.",
      });
    }

    // Validar formato básico do e-mail
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

    if (!emailValido) {
      return res.status(400).json({
        mensagem: "Informe um e-mail válido.",
      });
    }

    const novoOrgao = await cadastrarOrgao({
      nome: nome.trim(),
      tipoServico: tipoServico.trim(),
      telefone: telefone.trim(),
      email: email.trim(),
      endereco: endereco.trim(),
    });

    return res.status(201).json({
      mensagem: "Órgão público cadastrado com sucesso!",
      orgao: novoOrgao,
    });
  } catch (error) {
    console.error("Erro ao cadastrar órgão:", error);

    if (error.code === "P2002") {
      return res.status(409).json({
        mensagem: "Já existe um registro com esses dados únicos.",
      });
    }

    return res.status(500).json({
      mensagem: "Erro interno ao cadastrar órgão público.",
    });
  }
}
