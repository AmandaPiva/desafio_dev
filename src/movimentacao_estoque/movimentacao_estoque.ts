export interface EstoqueJson {
  codigoProduto: number;
  descricaoProduto: string;
  estoque: number;
}

export type TipoMovimentacao = "entrada" | "saida";

export interface MovimentacaoEstoque {
  id: number;
  codigoProduto: number;
  tipo: TipoMovimentacao;
  descricao: string;
  quantidade: number;
}

export interface ResultadoMovimentacao {
  movimentacao: MovimentacaoEstoque;
  estoqueFinal: number;
}

let proximoId = 1;

const funcaoMovimentacao = (
  produtos: EstoqueJson[],
  codigoProduto: number,
  tipo: TipoMovimentacao,
  quantidade: number
): Promise<ResultadoMovimentacao> => {
  const produto = produtos.find((item) => item.codigoProduto === codigoProduto);
  if (!produto) {
    return Promise.reject(new Error(`Produto ${codigoProduto} não encontrado`));
  }
  if (quantidade <= 0) {
    return Promise.reject(new Error("A quantidade da movimentação deve ser maior que zero"));
  }
  if (tipo === "saida" && produto.estoque < quantidade) {
    return Promise.reject(
      new Error(`Estoque insuficiente para o produto "${produto.descricaoProduto}"`)
    );
  }

  produto.estoque += tipo === "entrada" ? quantidade : -quantidade;

  const movimentacao: MovimentacaoEstoque = {
    id: proximoId++,
    codigoProduto,
    tipo,
    descricao: tipo === "entrada" ? "Entrada de mercadoria" : "Saída de mercadoria",
    quantidade,
  };

  return Promise.resolve({ movimentacao, estoqueFinal: produto.estoque });
};

export default funcaoMovimentacao;