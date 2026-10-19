
import { useState } from "react";
import {
  User,
  CreditCard,
  Mail,
  Lock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import AppHeader from "../components/AppHeader";
import InputField from "../components/InputField";
import { cadastrarUsuario } from "../services/usuarios.service";

function Cadastro() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function cadastrar(event) {
    event.preventDefault();

    if (carregando) return;

    setErro("");

    if (!nome || !cpf || !email || !senha || !confirmarSenha) {
      setErro("Preencha todos os campos.");
      return;
    }

    if (senha.length < 6) {
      setErro("A senha deve possuir pelo menos 6 caracteres.");
      return;
    }

    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    setCarregando(true);

    try {
      const dadosUsuario = {
        nome,
        cpf,
        email,
        senha,
        confirmarSenha,
      };

      await cadastrarUsuario(dadosUsuario);

      alert("Cadastro realizado com sucesso!");

      navigate("/");
    } catch (error) {
      setErro(
        error.message || "Não foi possível realizar o cadastro."
      );
    } finally {
      setCarregando(false);
    }
  }

  return (
    <section className="page">
      <AppHeader
        title="Criar Conta"
        subtitle="Preencha seus dados para começar"
      />

      <div className="page-content">
        <form onSubmit={cadastrar} className="form">
          <InputField
            name="nome"
            placeholder="Nome completo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            icon={User}
          />

          <InputField
            name="cpf"
            placeholder="CPF"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            icon={CreditCard}
          />

          <InputField
            name="email"
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={Mail}
          />

          <InputField
            name="senha"
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            icon={Lock}
          />

          <InputField
            name="confirmarSenha"
            type="password"
            placeholder="Confirmar Senha"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            icon={Lock}
          />

          {erro && (
            <div className="error-message" role="alert">
              {erro}
            </div>
          )}

          <button
            className="primary-button"
            type="submit"
            disabled={carregando}
            aria-busy={carregando}
          >
            {carregando ? "Cadastrando..." : "Cadastrar"}
          </button>

          <button
            type="button"
            className="link-button"
            onClick={() => navigate("/")}
          >
            Já tenho uma conta — Entrar
          </button>
        </form>
      </div>
    </section>
  );
}

export default Cadastro;
