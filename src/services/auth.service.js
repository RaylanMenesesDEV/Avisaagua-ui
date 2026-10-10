const API_URL = "http://localhost:3000/api";

export async function fazerLoginAPI(email, senha) {
  const resposta = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      senha,
    }),
  });

  const dados = await resposta.json();

  if (!resposta.ok) {
    throw new Error(dados.mensagem || dados.erro || "E-mail ou senha inválidos.");
  }

  return dados;
}
export async function verificarAutenticacao() {
  const token = localStorage.getItem("avisaagua_token");

  if (!token) {
    return false;
  }

  try {
    const resposta = await fetch(`${API_URL}/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return resposta.ok;
  } catch (error) {
    console.error("Erro ao verificar autenticação:", error);
    return false;
  }
}