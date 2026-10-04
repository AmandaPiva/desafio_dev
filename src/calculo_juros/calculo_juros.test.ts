import { test } from "node:test";
import assert from "node:assert/strict";
import funcaoCalculoJuros from "./calculo_juros.js";

test("não gera juros quando a data de vencimento ainda não chegou", () => {
  const juros = funcaoCalculoJuros(
    { valor: 1000, dataVencimento: new Date(2026, 9, 10) },
    { dataHoje: new Date(2026, 9, 4), multaAoDia: 2.5 },
  );

  assert.equal(juros, 0);
});

test("não gera juros quando o vencimento é hoje", () => {
  const juros = funcaoCalculoJuros(
    { valor: 1000, dataVencimento: new Date(2026, 9, 4) },
    { dataHoje: new Date(2026, 9, 4), multaAoDia: 2.5 },
  );

  assert.equal(juros, 0);
});

test("calcula juros proporcional aos dias de atraso", () => {
  const juros = funcaoCalculoJuros(
    { valor: 1000, dataVencimento: new Date(2026, 9, 1) },
    { dataHoje: new Date(2026, 9, 4), multaAoDia: 2.5 },
  );

  // 3 dias de atraso: 1000 * 0.025 * 3
  assert.equal(juros, 75);
});

test("respeita uma taxa de multa diária diferente", () => {
  const juros = funcaoCalculoJuros(
    { valor: 200, dataVencimento: new Date(2026, 8, 20) },
    { dataHoje: new Date(2026, 9, 4), multaAoDia: 5 },
  );

  // 14 dias de atraso: 200 * 0.05 * 14
  assert.equal(juros, 140);
});
