function NoticeCard({ aviso }) {
  return (
    <article className="notice-card">
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