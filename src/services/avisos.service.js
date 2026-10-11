
const API_URL = "http://localhost:3000/api";

export async function buscarAvisos() {
  const resposta = await fetch(`${API_URL}/avisos`);

  if (!resposta.ok) {
    throw new Error("Não foi possível consultar os avisos.");
  }

  const dados = await resposta.json();

  return dados.avisos;
}

// Consultar os detalhes de um aviso pelo ID
export async function buscarAvisoPorId(id) {
  const resposta = await fetch(
    `${API_URL}/avisos/${encodeURIComponent(id)}`
  );

  const dados = await resposta.json();

  if (!resposta.ok) {
    throw new Error(
      dados.mensagem || "Não foi possível consultar o aviso."
    );
  }

  return dados.aviso;
}