
import { useState } from "react";
import { AlertTriangle, Lightbulb, ThumbsUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { enviarFeedbackAPI } from "../services/feedbacks.service";

import AppHeader from "../components/AppHeader";

function Feedback() {
  const navigate = useNavigate();

  const [tipo, setTipo] = useState("Problema");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  const tipos = [
    {
      nome: "Problema",
      icon: AlertTriangle,
    },
    {
      nome: "Sugestão",
      icon: Lightbulb,
    },
    {
      nome: "Elogio",
      icon: ThumbsUp,
    },
  ];

  async function enviarFeedback(event) {
    event.preventDefault();

    if (carregando) return;

    setErro("");

    if (!mensagem.trim()) {
      setErro("Digite uma mensagem antes de enviar.");
      return;
    }

    // Converter o tipo selecionado para o formato da API
    const tiposAPI = {
      Problema: "PROBLEMA",
      Sugestão: "SUGESTAO",
      Elogio: "ELOGIO",
    };

    const tipoSelecionado = tiposAPI[tipo];

    setCarregando(true);

    try {
      await enviarFeedbackAPI(
        mensagem.trim(),
        tipoSelecionado
      );

      alert("Feedback enviado com sucesso!");

      setMensagem("");

      navigate("/dashboard");
    } catch (error) {
      setErro(
        error.message || "Não foi possível enviar o feedback."
      );
    } finally {
      setCarregando(false);
    }
  }

  return (
    <section className="page">
      <AppHeader
        title="Enviar Feedback"
        subtitle="Sua opinião é muito importante"
      />

      <div className="page-content">
        <form
          onSubmit={enviarFeedback}
          className="feedback-form"
        >
          <div className="feedback-group">
            <span className="feedback-label">
              TIPO DE FEEDBACK
            </span>

            <div className="feedback-types">
              {tipos.map(({ nome, icon: Icon }) => (
                <button
                  key={nome}
                  type="button"
                  className={`feedback-type ${
                    tipo === nome ? "selected" : ""
                  }`}
                  onClick={() => setTipo(nome)}
                  disabled={carregando}
                  aria-pressed={tipo === nome}
                >
                  <Icon size={12} />
                  {nome}
                </button>
              ))}
            </div>
          </div>

          <div className="feedback-group">
            <label
              htmlFor="mensagem"
              className="feedback-label"
            >
              MENSAGEM
            </label>

            <textarea
              id="mensagem"
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              placeholder="Descreva o que aconteceu ou sua sugestão..."
              disabled={carregando}
            />
          </div>

          {erro && (
            <div className="error-message" role="alert">
              {erro}
            </div>
          )}

          <button
            type="submit"
            className="primary-button feedback-submit"
            disabled={carregando}
            aria-busy={carregando}
          >
            {carregando
              ? "Enviando..."
              : "Enviar Feedback"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default Feedback;
