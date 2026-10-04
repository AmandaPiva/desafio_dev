import { test } from "node:test";
import assert from "node:assert/strict";
import funcaoMovimentacao, { EstoqueJson } from "./movimentacao_estoque.js";

const criarProdutos = (): EstoqueJson[] => [
  { codigoProduto: 101, descricaoProduto: "Caneta Azul", estoque: 150 },
  {
    codigoProduto: 102,
    descricaoProduto: "Caderno Universitário",
    estoque: 75,
  },
];

test("entrada de mercadoria soma ao estoque e retorna a qtde final", async () => {
  const produtos = criarProdutos();
  const { movimentacao, estoqueFinal } = await funcaoMovimentacao(
    produtos,
    101,
    "entrada",
    50,
  );

  assert.equal(estoqueFinal, 200);
  assert.equal(movimentacao.tipo, "entrada");
  assert.equal(movimentacao.descricao, "Entrada de mercadoria");
  assert.equal(movimentacao.quantidade, 50);
});

test("saída de mercadoria subtrai do estoque e retorna a qtde final", async () => {
  const produtos = criarProdutos();
  const { movimentacao, estoqueFinal } = await funcaoMovimentacao(
    produtos,
    102,
    "saida",
    25,
  );

  assert.equal(estoqueFinal, 50);
  assert.equal(movimentacao.tipo, "saida");
  assert.equal(movimentacao.descricao, "Saída de mercadoria");
});

test("cada movimentação recebe um id único", async () => {
  const produtos = criarProdutos();
  const primeira = await funcaoMovimentacao(produtos, 101, "entrada", 10);
  const segunda = await funcaoMovimentacao(produtos, 101, "entrada", 10);

  assert.notEqual(primeira.movimentacao.id, segunda.movimentacao.id);
});

test("rejeita saída quando o estoque é insuficiente", async () => {
  const produtos = criarProdutos();

  await assert.rejects(
    () => funcaoMovimentacao(produtos, 102, "saida", 1000),
    /Estoque insuficiente/,
  );
});

test("rejeita movimentação de produto inexistente", async () => {
  const produtos = criarProdutos();

  await assert.rejects(
    () => funcaoMovimentacao(produtos, 999, "entrada", 10),
    /não encontrado/,
  );
});

test("rejeita quantidade menor ou igual a zero", async () => {
  const produtos = criarProdutos();

  await assert.rejects(
    () => funcaoMovimentacao(produtos, 101, "entrada", 0),
    /maior que zero/,
  );
});
