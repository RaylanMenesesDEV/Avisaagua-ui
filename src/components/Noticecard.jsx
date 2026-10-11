
import { useNavigate } from "react-router-dom";

function NoticeCard({ aviso }) {
  const navigate = useNavigate();

  function abrirDetalhes() {
    navigate(`/avisos/${aviso.id}`);
  }

  return (
    <article
      className="notice-card"
      onClick={abrirDetalhes}
    >
      <div className={`notice-dot ${aviso.tipo}`} />

      <div className="notice-info">
        <h3>{aviso.titulo}</h3>

        <p>
          {aviso.local} • {aviso.horario}
        </p>
      </div>

      <span className={`notice-status ${aviso.status}`}>
        {aviso.status}
      </span>
    </article>
  );
}

export default NoticeCard;
