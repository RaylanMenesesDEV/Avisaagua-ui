export function validarEmail(email) {
  if (typeof email !== "string") {
    return false;
  }

  const emailNormalizado = email.trim().toLowerCase();

  const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return (
    emailNormalizado.length <= 254 &&
    formatoEmail.test(emailNormalizado)
  );
}