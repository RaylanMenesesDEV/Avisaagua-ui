
import {
  Droplets,
  Zap,
  Trash2,
  MessageSquare,
  LogOut,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import AppHeader from "../components/AppHeader";
import NoticeCard from "../components/Noticecard";
import NotificationCard from "../components/NotificationCard";

import { buscarAvisos } from "../services/avisos.service";
import { buscarNotificacoes } from "../services/notificacoes.service";

function Dashboard() {
  const navigate = useNavigate();

  // Estados dos avisos
  const [avisos, setAvisos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  // Categoria selecionada: Água, Energia ou Lixo
  const [categoriaSelecionada, setCategoriaSelecionada] =
    useState("AGUA");

  // Filtrar avisos ativos pela categoria selecionada
  const avisosFiltrados = avisos.filter(
    (aviso) => aviso.categoria === categoriaSelecionada
  );

  // Estados das notificações
  const [notificacoes, setNotificacoes] = useState([]);
  const [carregandoNotificacoes, setCarregandoNotificacoes] =
    useState(true);
  const [erroNotificacoes, setErroNotificacoes] = useState("");

  // Buscar avisos ativos na API
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
              local:
                aviso.orgao?.nome || "Órgão não informado",
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
          setErro("");
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

  // Buscar notificações na API
  useEffect(() => {
    let ativo = true;

    async function carregarNotificacoes() {
      try {
        const dados = await buscarNotificacoes();

        if (ativo) {
          setNotificacoes(dados);
          setErroNotificacoes("");
        }
      } catch (error) {
        if (ativo) {
          setErroNotificacoes(error.message);
        }
      } finally {
        if (ativo) {
          setCarregandoNotificacoes(false);
        }
      }
    }

    carregarNotificacoes();

    return () => {
      ativo = false;
    };
  }, []);

  // Recuperar usuário autenticado
  const usuario = JSON.parse(
    localStorage.getItem("avisaagua_usuario_logado")
  );

  // Encerrar sessão
  function sair() {
    localStorage.removeItem("avisaagua_usuario_logado");
    localStorage.removeItem("avisaagua_token");

    navigate("/");
  }

  return (
    <section className="page dashboard-page">
      {/* Cabeçalho */}
      <AppHeader
        title={`Olá, ${
          usuario?.nome?.split(" ")[0] || "Usuário"
        } 👋`}
        subtitle="Confira os avisos da sua região"
        showBack={false}
      />

      <div className="dashboard-content">
        {/* Categorias */}
        <section className="category-section">
          <span className="section-label">
            CATEGORIAS
          </span>

          <div className="categories">
            {/* Água */}
            <button
              type="button"
              className={`category ${
                categoriaSelecionada === "AGUA"
                  ? "active"
                  : ""
              }`}
              onClick={() => setCategoriaSelecionada("AGUA")}
              aria-pressed={categoriaSelecionada === "AGUA"}
            >
              <Droplets size={25} />
              <span>Água</span>
            </button>

            {/* Energia */}
            <button
              type="button"
              className={`category energy ${
                categoriaSelecionada === "ENERGIA"
                  ? "active"
                  : ""
              }`}
              onClick={() => setCategoriaSelecionada("ENERGIA")}
              aria-pressed={categoriaSelecionada === "ENERGIA"}
            >
              <Zap size={25} />
              <span>Energia</span>
            </button>

            {/* Lixo */}
            <button
              type="button"
              className={`category trash ${
                categoriaSelecionada === "LIXO"
                  ? "active"
                  : ""
              }`}
              onClick={() => setCategoriaSelecionada("LIXO")}
              aria-pressed={categoriaSelecionada === "LIXO"}
            >
              <Trash2 size={25} />
              <span>Lixo</span>
            </button>
          </div>
        </section>

        {/* Avisos ativos filtrados */}
        <section className="notices-section">
          <div className="section-title">
            <span>AVISOS ATIVOS</span>
            <strong>{avisosFiltrados.length}</strong>
          </div>

          <div className="notices-list">
            {carregando ? (
              <p>Carregando avisos...</p>
            ) : erro ? (
              <p role="alert">
                Não foi possível carregar os avisos.
                Tente novamente mais tarde.
              </p>
            ) : avisosFiltrados.length === 0 ? (
              <p>
                Nenhum aviso ativo nesta categoria no momento.
              </p>
            ) : (
              avisosFiltrados.map((aviso) => (
                <NoticeCard
                  key={aviso.id}
                  aviso={aviso}
                />
              ))
            )}
          </div>
        </section>

        {/* Notificações recentes */}
        <section className="notices-section">
          <div className="section-title">
            <span>NOTIFICAÇÕES RECENTES</span>
            <strong>{notificacoes.length}</strong>
          </div>

          <div className="notices-list">
            {carregandoNotificacoes ? (
              <p>Carregando notificações...</p>
            ) : erroNotificacoes ? (
              <p role="alert">
                Não foi possível carregar as notificações.
              </p>
            ) : notificacoes.length === 0 ? (
              <p>
                Nenhuma notificação cadastrada no momento.
              </p>
            ) : (
              notificacoes.map((notificacao) => (
                <NotificationCard
                  key={notificacao.id}
                  notificacao={notificacao}
                />
              ))
            )}
          </div>
        </section>

        {/* Enviar feedback */}
        <button
          className="feedback-button"
          onClick={() => navigate("/feedback")}
        >
          <MessageSquare size={18} />
          Enviar Feedback
        </button>

        {/* Sair da conta */}
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
