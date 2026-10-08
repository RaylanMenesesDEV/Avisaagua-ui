export function validarCpf(cpf) {
  if (typeof cpf !== "string") return false;

  const numeros = cpf.replace(/\D/g, "");

  if (!/^\d{11}$/.test(numeros)) return false;
  if (/^(\d)\1{10}$/.test(numeros)) return false;

  for (let tamanho = 9; tamanho <= 10; tamanho++) {
    let soma = 0;

    for (let i = 0; i < tamanho; i++) {
      soma += Number(numeros[i]) * (tamanho + 1 - i);
    }

    const resto = (soma * 10) % 11;
    const digito = resto === 10 ? 0 : resto;

    if (digito !== Number(numeros[tamanho])) {
      return false;
    }
  }

  return true;
}