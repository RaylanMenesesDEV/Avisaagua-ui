const API_URL = "http://localhost:3000/api";

// Consultar todas as notificações cadastradas
export async function buscarNotificacoes() {
  const resposta = await fetch(`${API_URL}/notificacoes`);

  if (!resposta.ok) {
    throw new Error(
      "Não foi possível consultar as notificações."
    );
  }

  const dados = await resposta.json();

  return dados.notificacoes;
}