import funcaoCalculoJuros from "./calculo_juros.js";

const valor = 250.0;
const dataVencimento = new Date(2026, 8, 20);

const juros = funcaoCalculoJuros(
  { valor, dataVencimento },
  { dataHoje: new Date(), multaAoDia: 2.5 },
);

console.log(`Valor original: R$ ${valor.toFixed(2)}`);
console.log(`Juros até hoje: R$ ${juros.toFixed(2)}`);
