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

  try {
    await enviarFeedbackAPI(
      mensagem.trim(),
      tipoSelecionado
    );

    alert("Feedback enviado com sucesso!");

    setMensagem("");

    navigate("/dashboard");
  } catch (error) {
    setErro(error.message);
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
              onChange={(e) =>
                setMensagem(e.target.value)
              }
              placeholder="Descreva o que aconteceu ou sua sugestão..."
            />

          </div>

          {erro && (
            <div className="error-message">
              {erro}
            </div>
          )}

          <button
            type="submit"
            className="primary-button feedback-submit"
          >
            Enviar Feedback
          </button>

        </form>

      </div>

    </section>
  );
}

export default Feedback;