
import api from "./api";

// Realizar login utilizando a API
export async function fazerLoginAPI(email, senha) {
  try {
    const resposta = await api.post("/auth/login", {
      email,
      senha,
    });

    return resposta.data;
  } catch (error) {
    const mensagem =
      error.response?.data?.mensagem ||
      error.response?.data?.erro ||
      "Não foi possível realizar o login. Verifique suas credenciais ou tente novamente.";

    throw new Error(mensagem);
  }
}

// Verificar se o usuário continua autenticado
export async function verificarAutenticacao() {
  const token = localStorage.getItem("avisaagua_token");

  if (!token) {
    return false;
  }

  try {
    await api.get("/auth/me");

    return true;
  } catch (error) {
    console.error("Erro ao verificar autenticação:", error.message);
    return false;
  }
}
