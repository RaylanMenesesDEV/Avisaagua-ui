const API_URL = "http://localhost:3000/api";

export async function cadastrarUsuario(dadosUsuario) {
  const resposta = await fetch(`${API_URL}/usuarios`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dadosUsuario),
  });

  const dados = await resposta.json();

  if (!resposta.ok) {
    throw new Error(
      dados.mensagem ||
      dados.erro ||
      "Não foi possível realizar o cadastro."
    );
  }

  return dados;
}