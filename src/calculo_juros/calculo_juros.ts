export interface ValorProduto {
  valor: number;
  dataVencimento: Date;
}

export interface ParametrosCalculoJuros {
  dataHoje: Date;
  multaAoDia: number; // Representa a porcentagem diária de multa, ex: 2.5 para 2,5%
}

const funcaoCalculoJuros = (
  valorProduto: ValorProduto,
  parametros: ParametrosCalculoJuros,
): number => {
  const diasAtraso = Math.max(
    0,
    Math.floor(
      (parametros.dataHoje.getTime() - valorProduto.dataVencimento.getTime()) /
        (1000 * 60 * 60 * 24),
    ),
  );
  const juros = valorProduto.valor * (parametros.multaAoDia / 100) * diasAtraso;
  return juros;
};

export default funcaoCalculoJuros;
