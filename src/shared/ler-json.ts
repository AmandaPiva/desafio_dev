import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// Lê e parseia um JSON a partir do caminho de um módulo
export const lerJson = <T>(
  moduleUrl: string,
  ...caminhoRelativo: string[]
): T => {
  const diretorio = dirname(fileURLToPath(moduleUrl));
  const caminhoArquivo = join(diretorio, ...caminhoRelativo);
  const conteudo = readFileSync(caminhoArquivo, "utf-8");
  return JSON.parse(conteudo) as T;
};
