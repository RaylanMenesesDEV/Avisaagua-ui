
import api from "./api";

// Enviar um feedback do cidadão para a API
export async function enviarFeedbackAPI(mensagem, tipo) {
  const token = localStorage.getItem("avisaagua_token");

  if (!token) {
    throw new Error("Sua sessão expirou. Faça login novamente.");
  }

  try {
    const resposta = await api.post("/feedbacks", {
      mensagem,
      tipo,
    });

    return resposta.data;
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error("Sua sessão expirou. Faça login novamente.");
    }

    throw new Error(
      error.response?.data?.mensagem ||
      "Não foi possível enviar o feedback."
    );
  }
}
