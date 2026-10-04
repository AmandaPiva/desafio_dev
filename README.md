# Desafio Dev

Projeto em TypeScript com três exercícios independentes:

- **Comissão de vendedores** (`src/comissao`): calcula a comissão de cada vendedor a partir de um JSON de vendas, aplicando faixas percentuais por valor de venda.
- **Movimentação de estoque** (`src/movimentacao_estoque`): lança entradas e saídas de produtos em estoque e retorna a quantidade final após a movimentação.
- **Cálculo de juros** (`src/calculo_juros`): calcula o valor dos juros de uma conta em atraso, com multa de 2,5% ao dia sobre o valor original.

## Pré-requisitos

- [Node.js](https://nodejs.org/) 20 ou superior

## Instalação

```bash
npm install
```

## Como executar cada exercício

Cada módulo tem seu próprio ponto de entrada (`index.ts`) com um exemplo de uso:

```bash
npm run dev:comissao   # calcula a comissão a partir de src/registro_vendas.json
npm run dev:estoque    # lança uma movimentação de estoque a partir de src/estoque.json
npm run dev:juros      # calcula os juros de uma conta de exemplo
```

Esses comandos rodam em modo _watch_ (reiniciam automaticamente ao salvar um arquivo).

## Como rodar os testes

```bash
npm test
```

Executa todos os arquivos `*.test.ts` do projeto usando o test runner nativo do Node (`node:test`).

## Estrutura do projeto

```
src/
  comissao/              # cálculo de comissão de vendas
  movimentacao_estoque/  # entrada/saída de estoque
  calculo_juros/         # cálculo de juros por atraso
  shared/                # helpers compartilhados (ex: leitura de JSON)
  estoque.json           # dados de exemplo usados por movimentacao_estoque
  registro_vendas.json   # dados de exemplo usados por comissao
```

Cada módulo contém:

- o arquivo com a lógica principal (ex: `comissao.ts`)
- um arquivo de testes (`*.test.ts`)
- um `index.ts` com um exemplo de uso executável
