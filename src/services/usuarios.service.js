
import api from "./api";

// Cadastrar um novo cidadão no AvisaÁgua
export async function cadastrarUsuario(dadosUsuario) {
  try {
    const resposta = await api.post("/usuarios", dadosUsuario);

    return resposta.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.mensagem ||
      error.response?.data?.erro ||
      "Não foi possível realizar o cadastro."
    );
  }
}
