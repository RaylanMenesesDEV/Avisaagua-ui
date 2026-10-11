function NotificationCard({ notificacao }) {
  const dataFormatada = notificacao.dataEnvio
    ? new Date(notificacao.dataEnvio).toLocaleString("pt-BR", {
        dateStyle: "short",
        timeStyle: "short",
      })
    : "Data não informada";

  return (
    <article className="notice-card">
      <div className="notice-info">
        <h3>{notificacao.tipo}</h3>

        <p>{notificacao.mensagem}</p>

        <p>Enviado em: {dataFormatada}</p>
      </div>
    </article>
  );
}

export default NotificationCard;