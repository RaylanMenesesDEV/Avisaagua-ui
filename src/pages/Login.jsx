import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import AppHeader from "../components/AppHeader";
import InputField from "../components/InputField";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  function fazerLogin(event) {
    event.preventDefault();

    setErro("");

    if (!email || !senha) {
      setErro("Preencha o e-mail e a senha.");
      return;
    }

    const usuarioSalvo = localStorage.getItem("avisaagua_usuario");

    if (!usuarioSalvo) {
      setErro("Usuário não cadastrado. Crie uma conta primeiro.");
      return;
    }

    const usuario = JSON.parse(usuarioSalvo);

    if (usuario.email !== email || usuario.senha !== senha) {
      setErro("E-mail ou senha inválidos.");
      return;
    }

    localStorage.setItem(
      "avisaagua_usuario_logado",
      JSON.stringify(usuario)
    );

    navigate("/dashboard");
  }

  return (
    <section className="page">
      <AppHeader
        title="Entrar"
        subtitle="Acesse sua conta para ver os avisos"
        showBack={false}
      />

      <div className="page-content">
        <form onSubmit={fazerLogin} className="form">

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

          {erro && <div className="error-message">{erro}</div>}

          <button className="primary-button" type="submit">
            Entrar
          </button>

          <button
            type="button"
            className="link-button"
            onClick={() =>
              alert("A recuperação de senha será implementada futuramente.")
            }
          >
            Esqueci a Senha
          </button>

          <div className="divider">
            <span>ou</span>
          </div>

          <button
            type="button"
            className="outline-button"
            onClick={() => navigate("/cadastro")}
          >
            Criar uma conta nova
          </button>

        </form>
      </div>
    </section>
  );
}

export default Login;