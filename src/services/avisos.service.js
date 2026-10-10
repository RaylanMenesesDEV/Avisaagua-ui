
const API_URL = "http://localhost:3000/api";

export async function buscarAvisos() {
  const resposta = await fetch(`${API_URL}/avisos`);

  if (!resposta.ok) {
    throw new Error("Não foi possível consultar os avisos.");
  }

  const dados = await resposta.json();

  return dados.avisos;
}
