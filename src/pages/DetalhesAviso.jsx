
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import AppHeader from "../components/AppHeader";
import { buscarAvisoPorId } from "../services/avisos.service";

function DetalhesAviso() {
  const { id } = useParams();

  const [aviso, setAviso] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    let ativo = true;

    async function carregarDetalhes() {
      try {
        const dados = await buscarAvisoPorId(id);

        if (ativo) {
          setAviso(dados);
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

    carregarDetalhes();

    return () => {
      ativo = false;
    };
  }, [id]);

  function formatarData(data) {
    if (!data) {
      return "Não informada";
    }

    const dataFormatada = new Date(data);

    if (Number.isNaN(dataFormatada.getTime())) {
      return "Data inválida";
    }

    return dataFormatada.toLocaleString("pt-BR", {
      dateStyle: "short",
      timeStyle: "short",
    });
  }

  function formatarCategoria(categoria) {
    const categorias = {
      AGUA: "Água",
      ENERGIA: "Energia",
      LIXO: "Lixo",
    };

    return categorias[categoria] || categoria;
  }

  return (
    <section className="page dashboard-page">
      <AppHeader
        title="Detalhes do Aviso"
        subtitle="Informações completas sobre o comunicado"
        showBack={true}
      />

      <div className="dashboard-content">
        {carregando ? (
          <p>Carregando detalhes do aviso...</p>
        ) : erro ? (
          <p role="alert">{erro}</p>
        ) : !aviso ? (
          <p>Aviso não encontrado.</p>
        ) : (
          <article className="notice-card detalhes-aviso-card">
            <div className="notice-info">
              <h2>{aviso.titulo}</h2>

              <p>
                <strong>Descrição:</strong>
                {" "}
                {aviso.descricao}
              </p>

              <p>
                <strong>Categoria:</strong>
                {" "}
                {formatarCategoria(aviso.categoria)}
              </p>

              <p>
                <strong>Status:</strong>
                {" "}
                {aviso.status === "ATIVO"
                  ? "Ativo"
                  : "Encerrado"}
              </p>

              <p>
                <strong>Órgão responsável:</strong>
                {" "}
                {aviso.orgao?.nome || "Não informado"}
              </p>

              <p>
                <strong>Data de publicação:</strong>
                {" "}
                {formatarData(aviso.dataPublicacao)}
              </p>

              <p>
                <strong>Previsão de retorno:</strong>
                {" "}
                {formatarData(aviso.dataPrevistaRetorno)}
              </p>
            </div>
          </article>
        )}
      </div>
    </section>
  );
}

export default DetalhesAviso;
