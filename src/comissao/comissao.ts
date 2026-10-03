export interface VendasJson {
  vendedor: string;
  valor: number;
}

export interface comissaoVendedor {
  vendedor: string;
  comissao: number;
}

const calcularComissaoVenda = (valor: number): number => {
  if (valor < 100) return 0;
  if (valor < 500) return valor * 0.01;
  return valor * 0.05;
};

const funcaoComissao = (vendas: VendasJson[]): Promise<comissaoVendedor[]> => {
  const comissoes: comissaoVendedor[] = [];
  const vendedores = Array.from(new Set(vendas.map((venda) => venda.vendedor)));
  for (const vendedor of vendedores) {
    const totalComissao = vendas
      .filter((venda) => venda.vendedor === vendedor)
      .reduce((total, venda) => total + calcularComissaoVenda(venda.valor), 0);
    comissoes.push({ vendedor, comissao: totalComissao });
  }
  return Promise.resolve(comissoes);
};

export default funcaoComissao;
