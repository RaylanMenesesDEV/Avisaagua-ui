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
import { useEffect, useState } from "react";
import { buscarAvisos } from "../services/avisos.service";

function Dashboard() {
  const navigate = useNavigate();
  
const [avisos, setAvisos] = useState([]);
const [carregando, setCarregando] = useState(true);
const [erro, setErro] = useState("");

useEffect(() => {
  let ativo = true;

  async function carregarAvisos() {
    try {
      const dados = await buscarAvisos();

      
if (ativo) {
  const avisosAtivos = dados
    .filter((aviso) => aviso.status === "ATIVO")
    .map((aviso) => ({
      id: aviso.id,
      titulo: aviso.titulo,
      tipo: aviso.categoria.toLowerCase(),
      categoria: aviso.categoria,
      local: aviso.orgao?.nome || "Órgão não informado",
      horario: aviso.dataPrevistaRetorno
        ? `Retorno previsto: ${new Date(
            aviso.dataPrevistaRetorno
          ).toLocaleString("pt-BR", {
            dateStyle: "short",
            timeStyle: "short",
          })}`
        : "Retorno não informado",
      status: "Ativo",
    }));

  setAvisos(avisosAtivos);
}

    } catch (error) {
      if (ativo) {
        setErro(error.message);
      }
    } finally {
      if (ativo) {
        setCarregando(false);
      }
    }
  }

  carregarAvisos();

  return () => {
    ativo = false;
  };
}, []);


  const usuario = JSON.parse(
    localStorage.getItem("avisaagua_usuario_logado")
  );

  function sair() {
  localStorage.removeItem("avisaagua_usuario_logado");
  localStorage.removeItem("avisaagua_token");

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
  {carregando ? (
    <p>Carregando avisos...</p>
  ) : erro ? (
    <p role="alert">
      Não foi possível carregar os avisos. Tente novamente mais tarde.
    </p>
  ) : avisos.length === 0 ? (
    <p>Nenhum aviso ativo no momento.</p>
  ) : (
    avisos.map((aviso) => (
      <NoticeCard
        key={aviso.id}
        aviso={aviso}
      />
    ))
  )}
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