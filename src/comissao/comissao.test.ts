import { test } from "node:test";
import assert from "node:assert/strict";
import funcaoComissao from "./comissao.js";

test("venda abaixo de R$100,00 não gera comissão", async () => {
  const resultado = await funcaoComissao([{ vendedor: "Teste", valor: 99.99 }]);
  assert.equal(resultado[0].comissao, 0);
});

test("venda abaixo de R$500,00 gera 1% de comissão", async () => {
  const resultado = await funcaoComissao([{ vendedor: "Teste", valor: 300 }]);
  assert.equal(resultado[0].comissao, 3);
});

test("venda a partir de R$500,00 gera 5% de comissão", async () => {
  const resultado = await funcaoComissao([{ vendedor: "Teste", valor: 500 }]);
  assert.equal(resultado[0].comissao, 25);
});

test("soma comissões de múltiplas vendas de um mesmo vendedor", async () => {
  const resultado = await funcaoComissao([
    { vendedor: "Teste", valor: 50 }, // 0
    { vendedor: "Teste", valor: 200 }, // 2
    { vendedor: "Teste", valor: 1000 }, // 50
  ]);
  assert.equal(resultado[0].comissao, 52);
});
