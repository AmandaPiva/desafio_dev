import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import funcaoComissao, { VendasJson } from "./comissao/comissao.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

interface RegistroVendas {
  vendas: VendasJson[];
}

const caminhoArquivo = join(__dirname, "registro_vendas.json");
const conteudo = readFileSync(caminhoArquivo, "utf-8");
const { vendas } = JSON.parse(conteudo) as RegistroVendas;

funcaoComissao(vendas).then((comissoes) => {
  for (const { vendedor, comissao } of comissoes) {
    console.log(`${vendedor}: R$ ${comissao.toFixed(2)}`);
  }
});
