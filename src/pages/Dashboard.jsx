import {
  Droplets,
  Zap,
  Trash2,
  MessageSquare,
  LogOut,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import AppHeader from "../components/AppHeader";
import NoticeCard from "../components/Noticecard";
import { avisos } from "../data/avisos";

function Dashboard() {
  const navigate = useNavigate();

  const usuario = JSON.parse(
    localStorage.getItem("avisaagua_usuario_logado")
  );

  function sair() {
    localStorage.removeItem("avisaagua_usuario_logado");
    navigate("/");
  }

  return (
    <section className="page dashboard-page">

      <AppHeader
        title={`Olá, ${usuario?.nome?.split(" ")[0] || "Usuário"} 👋`}
        subtitle="Confira os avisos da sua região"
        showBack={false}
      />

      <div className="dashboard-content">

        <section className="category-section">

          <span className="section-label">
            CATEGORIAS
          </span>

          <div className="categories">

            <button className="category active">
              <Droplets size={25} />
              <span>Água</span>
            </button>

            <button className="category energy">
              <Zap size={25} />
              <span>Energia</span>
            </button>

            <button className="category trash">
              <Trash2 size={25} />
              <span>Lixo</span>
            </button>

          </div>

        </section>

        <section className="notices-section">

          <div className="section-title">
            <span>AVISOS ATIVOS</span>

            <strong>{avisos.length}</strong>
          </div>

          <div className="notices-list">
            {avisos.map((aviso) => (
              <NoticeCard
                key={aviso.id}
                aviso={aviso}
              />
            ))}
          </div>

        </section>

        <button
          className="feedback-button"
          onClick={() => navigate("/feedback")}
        >
          <MessageSquare size={18} />
          Enviar Feedback
        </button>

        <button
          className="logout-button"
          onClick={sair}
        >
          <LogOut size={17} />
          Sair da conta
        </button>

      </div>
    </section>
  );
}

export default Dashboard;