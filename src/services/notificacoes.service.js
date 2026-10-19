
import api from "./api";

// Consultar todas as notificações cadastradas
export async function buscarNotificacoes() {
  try {
    const resposta = await api.get("/notificacoes");

    return resposta.data.notificacoes;
  } catch (error) {
    throw new Error(
      error.response?.data?.mensagem ||
      "Não foi possível consultar as notificações."
    );
  }
}
