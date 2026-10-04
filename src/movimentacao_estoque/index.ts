import funcaoMovimentacao, { EstoqueJson } from "./movimentacao_estoque.js";
import { lerJson } from "../shared/ler-json.js";

interface RegistroEstoque {
  estoque: EstoqueJson[];
}

const { estoque } = lerJson<RegistroEstoque>(import.meta.url, "..", "estoque.json");

funcaoMovimentacao(estoque, 101, "saida", 30)
  .then(({ movimentacao, estoqueFinal }) => {
    console.log(
      `Movimentação #${movimentacao.id} - ${movimentacao.descricao} (produto ${movimentacao.codigoProduto}, qtde ${movimentacao.quantidade})`,
    );
    console.log(`Estoque final: ${estoqueFinal}`);
  })
  .catch((erro: Error) => console.error(erro.message));
