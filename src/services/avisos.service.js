
import api from "./api";

// Consultar todos os avisos cadastrados
export async function buscarAvisos() {
  try {
    const resposta = await api.get("/avisos");

    return resposta.data.avisos;
  } catch (error) {
    throw new Error(
      error.response?.data?.mensagem ||
      "Não foi possível consultar os avisos."
    );
  }
}

// Consultar os detalhes de um aviso pelo ID
export async function buscarAvisoPorId(id) {
  try {
    const resposta = await api.get(
      `/avisos/${encodeURIComponent(id)}`
    );

    return resposta.data.aviso;
  } catch (error) {
    throw new Error(
      error.response?.data?.mensagem ||
      "Não foi possível consultar o aviso."
    );
  }
}
