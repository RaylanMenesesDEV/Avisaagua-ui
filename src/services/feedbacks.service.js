const API_URL = "http://localhost:3000/api";

export async function enviarFeedbackAPI(mensagem, tipo) {
  const token = localStorage.getItem("avisaagua_token");

  if (!token) {
    throw new Error("Sua sessão expirou. Faça login novamente.");
  }

  const resposta = await fetch(`${API_URL}/feedbacks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      mensagem,
      tipo,
    }),
  });

  const dados = await resposta.json();

  if (!resposta.ok) {
    throw new Error(
      dados.mensagem || "Não foi possível enviar o feedback."
    );
  }

  return dados;
}