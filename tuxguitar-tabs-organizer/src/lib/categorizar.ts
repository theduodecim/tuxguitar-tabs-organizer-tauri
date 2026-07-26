// src/lib/categorizar.ts
import { CATEGORIAS, SIN_CATEGORIA, type Categoria } from "./categorias";

/**
 * Normaliza un string: minúsculas, sin tildes, sin guiones/espacios extra.
 * Esto hace que "Sweep_Picking", "sweep picking" y "sweeppiking" se comparen
 * de forma consistente.
 */
function normalizar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // saca tildes
    .replace(/[_\-\s]+/g, ""); // saca guiones bajos, medios y espacios
}

/**
 * Dado un nombre de archivo (sin extensión idealmente, pero funciona igual con ella),
 * devuelve la categoría que matchea, o SIN_CATEGORIA si ninguna lo hace.
 */
export function categorizarArchivo(nombreArchivo: string): Categoria {
  const nombreNormalizado = normalizar(nombreArchivo);

  for (const categoria of CATEGORIAS) {
    for (const keyword of categoria.keywords) {
      const keywordNormalizado = normalizar(keyword);
      if (nombreNormalizado.includes(keywordNormalizado)) {
        return categoria;
      }
    }
  }

  return SIN_CATEGORIA;
}

export interface ArchivoCategorizado {
  nombre: string; // nombre completo del archivo, con extensión
  categoria: Categoria;
}

/**
 * Aplica categorizarArchivo a una lista de nombres de archivo.
 */
export function categorizarArchivos(nombres: string[]): ArchivoCategorizado[] {
  return nombres.map((nombre) => ({
    nombre,
    categoria: categorizarArchivo(nombre),
  }));
}