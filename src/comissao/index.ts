import funcaoComissao, { VendasJson } from "./comissao.js";
import { lerJson } from "../shared/ler-json.js";

interface RegistroVendas {
  vendas: VendasJson[];
}

const { vendas } = lerJson<RegistroVendas>(
  import.meta.url,
  "..",
  "registro_vendas.json",
);

funcaoComissao(vendas).then((comissoes) => {
  for (const { vendedor, comissao } of comissoes) {
    console.log(`${vendedor}: R$ ${comissao.toFixed(2)}`);
  }
});
