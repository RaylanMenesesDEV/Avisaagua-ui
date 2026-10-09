


import {
  listarAvisos,
  cadastrarAviso,
  buscarAvisoPorId,
  atualizarAviso,
  encerrarAviso,
} from "../services/avisos.service.js";



// Listar todos os avisos públicos
export async function buscarAvisos(req, res) {
  try {
    const avisos = await listarAvisos();
    
return res.status(200).json({
  mensagem: "Avisos consultados com sucesso!",
  total: avisos.length,
  avisos,
});

  } catch (error) {
    console.error("Erro ao buscar avisos:", error);
    return res.status(500).json({
      mensagem: "Erro interno ao buscar avisos.",
    });
  }
}

// Cadastrar um novo aviso público
export async function criarAviso(req, res) {
  try {
    const {
      titulo,
      descricao,
      categoria,
      dataPrevistaRetorno,
      orgaoId,
    } = req.body;

    // Validar campos obrigatórios
    if (
      typeof titulo !== "string" ||
      !titulo.trim() ||
      typeof descricao !== "string" ||
      !descricao.trim()
    ) {
      return res.status(400).json({
        mensagem: "Título e descrição são obrigatórios.",
      });
    }

    // Validar categoria
    const categoriasValidas = ["AGUA", "ENERGIA", "LIXO"];

    if (!categoriasValidas.includes(categoria)) {
      return res.status(400).json({
        mensagem: "Categoria inválida.",
      });
    }

    // Validar órgão responsável
    if (
      !Number.isInteger(orgaoId) ||
      orgaoId <= 0
    ) {
      return res.status(400).json({
        mensagem: "O ID do órgão deve ser um número inteiro positivo.",
      });
    }

    // Validar data prevista de retorno
    let dataRetorno = null;

    if (
      dataPrevistaRetorno !== undefined &&
      dataPrevistaRetorno !== null
    ) {
      
if (
  typeof dataPrevistaRetorno !== "string" ||
  !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?Z$/.test(dataPrevistaRetorno)
) {
  return res.status(400).json({
    mensagem: "Informe a data no formato ISO 8601 UTC.",
  });
}


      dataRetorno = new Date(dataPrevistaRetorno);

      if (Number.isNaN(dataRetorno.getTime())) {
        return res.status(400).json({
          mensagem: "Data prevista de retorno inválida.",
        });
      }
    }

    const novoAviso = await cadastrarAviso({
      titulo: titulo.trim(),
      descricao: descricao.trim(),
      categoria,
      dataPrevistaRetorno: dataRetorno,
      orgaoId,
    });

    return res.status(201).json({
      mensagem: "Aviso cadastrado com sucesso!",
      aviso: novoAviso,
    });
  } catch (error) {
    // Órgão inexistente (restrição de chave estrangeira)
    if (error.code === "P2003") {
      return res.status(400).json({
        mensagem: "O órgão informado não existe.",
      });
    }

    console.error("Erro ao cadastrar aviso:", error);

    return res.status(500).json({
      mensagem: "Erro interno ao cadastrar aviso.",
    });
  }
}

// Consultar um aviso público pelo ID
export async function consultarAvisoPorId(req, res) {
  try {
    const id = Number(req.params.id);

    // Validar o ID informado
    if (!Number.isSafeInteger(id) || id <= 0) {
      return res.status(400).json({
        mensagem: "O ID do aviso deve ser um número inteiro positivo.",
      });
    }

    // Consultar o aviso no banco de dados
    const aviso = await buscarAvisoPorId(id);

    // Verificar se o aviso existe
    if (!aviso) {
      return res.status(404).json({
        mensagem: "Aviso não encontrado.",
      });
    }

    // Retornar o aviso encontrado
    return res.status(200).json({
      mensagem: "Aviso consultado com sucesso!",
      aviso,
    });
  } catch (error) {
    console.error("Erro ao consultar aviso por ID:", error);

    return res.status(500).json({
      mensagem: "Erro interno ao consultar aviso.",
    });
  }
}


// Editar um aviso público existente
export async function editarAviso(req, res) {
  try {
    const id = Number(req.params.id);

    // Validar o ID do aviso
    if (!Number.isSafeInteger(id) || id <= 0) {
      return res.status(400).json({
        mensagem: "O ID do aviso deve ser um número inteiro positivo.",
      });
    }

    // Permitir somente os campos editáveis
    const camposPermitidos = [
      "titulo",
      "descricao",
      "categoria",
      "dataPrevistaRetorno",
      "orgaoId",
    ];

    const camposRecebidos = Object.keys(req.body ?? {});

    if (
      camposRecebidos.length === 0 ||
      camposRecebidos.some(
        (campo) => !camposPermitidos.includes(campo)
      )
    ) {
      return res.status(400).json({
        mensagem: "Informe apenas campos permitidos para edição.",
      });
    }

    const dados = {};

    // Validar título e descrição
    for (const campo of ["titulo", "descricao"]) {
      if (camposRecebidos.includes(campo)) {
        const valor = req.body[campo];

        if (typeof valor !== "string" || !valor.trim()) {
          return res.status(400).json({
            mensagem: `${campo} deve ser um texto não vazio.`,
          });
        }

        dados[campo] = valor.trim();
      }
    }

    // Validar categoria
    if (camposRecebidos.includes("categoria")) {
      if (!["AGUA", "ENERGIA", "LIXO"].includes(req.body.categoria)) {
        return res.status(400).json({
          mensagem: "Categoria inválida.",
        });
      }

      dados.categoria = req.body.categoria;
    }

    // Validar órgão responsável
    if (camposRecebidos.includes("orgaoId")) {
      if (
        !Number.isSafeInteger(req.body.orgaoId) ||
        req.body.orgaoId <= 0
      ) {
        return res.status(400).json({
          mensagem: "O ID do órgão deve ser um inteiro positivo.",
        });
      }

      dados.orgaoId = req.body.orgaoId;
    }

    // Validar previsão de retorno
    if (camposRecebidos.includes("dataPrevistaRetorno")) {
      const valor = req.body.dataPrevistaRetorno;

      if (valor === null) {
        dados.dataPrevistaRetorno = null;
      } else {
        if (
          typeof valor !== "string" ||
          !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?Z$/.test(valor)
        ) {
          return res.status(400).json({
            mensagem: "Informe a data no formato ISO 8601 UTC.",
          });
        }

        const data = new Date(valor);

        if (Number.isNaN(data.getTime())) {
          return res.status(400).json({
            mensagem: "Data prevista de retorno inválida.",
          });
        }

        dados.dataPrevistaRetorno = data;
      }
    }

    // Confirmar se o aviso existe
    const avisoExistente = await buscarAvisoPorId(id);

    if (!avisoExistente) {
      return res.status(404).json({
        mensagem: "Aviso não encontrado.",
      });
    }

    // Atualizar o aviso no banco
    const avisoAtualizado = await atualizarAviso(id, dados);

    return res.status(200).json({
      mensagem: "Aviso atualizado com sucesso!",
      aviso: avisoAtualizado,
    });
  } catch (error) {
    if (error.code === "P2003") {
      return res.status(400).json({
        mensagem: "O órgão informado não existe.",
      });
    }

    if (error.code === "P2025") {
      return res.status(404).json({
        mensagem: "Aviso não encontrado.",
      });
    }

    console.error("Erro ao atualizar aviso:", error);

    return res.status(500).json({
      mensagem: "Erro interno ao atualizar aviso.",
    });
  }
}

// Encerrar um aviso público
export async function finalizarAviso(req, res) {
  try {
    const id = Number(req.params.id);

    // Validar o ID informado
    if (!Number.isSafeInteger(id) || id <= 0) {
      return res.status(400).json({
        mensagem: "O ID do aviso deve ser um número inteiro positivo.",
      });
    }

    // Verificar se o aviso existe
    const avisoExistente = await buscarAvisoPorId(id);

    if (!avisoExistente) {
      return res.status(404).json({
        mensagem: "Aviso não encontrado.",
      });
    }

    // Impedir o encerramento duplicado
    if (avisoExistente.status === "ENCERRADO") {
      return res.status(409).json({
        mensagem: "Este aviso já está encerrado.",
      });
    }

    // Atualizar o status no PostgreSQL
    const avisoFinalizado = await encerrarAviso(id);

    return res.status(200).json({
      mensagem: "Aviso encerrado com sucesso!",
      aviso: avisoFinalizado,
    });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({
        mensagem: "Aviso não encontrado.",
      });
    }

    console.error("Erro ao encerrar aviso:", error);

    return res.status(500).json({
      mensagem: "Erro interno ao encerrar aviso.",
    });
  }
}
