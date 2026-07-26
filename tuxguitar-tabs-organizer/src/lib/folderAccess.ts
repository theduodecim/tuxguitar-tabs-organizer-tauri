// src/lib/folderAccess.ts
import { open } from "@tauri-apps/plugin-dialog";
import { readDir } from "@tauri-apps/plugin-fs";
import { openPath } from "@tauri-apps/plugin-opener";

const CLAVE_STORAGE = "guitar-trainer:carpeta_seleccionada";

/** Recupera la ruta de carpeta guardada de una sesión anterior (o null si no hay). */
export function recuperarCarpetaGuardada(): string | null {
  return localStorage.getItem(CLAVE_STORAGE);
}

/** Abre el picker nativo de carpeta y guarda la ruta elegida para la próxima vez. */
export async function seleccionarNuevaCarpeta(): Promise<string | null> {
  const ruta = await open({
    directory: true,
    multiple: false,
  });

  if (!ruta || Array.isArray(ruta)) return null;

  localStorage.setItem(CLAVE_STORAGE, ruta);
  return ruta;
}

/**
 * Escanea SOLO el nivel raíz de la carpeta (sin subcarpetas) y devuelve
 * los nombres de todos los archivos .tg encontrados.
 */
export async function listarArchivosTg(rutaCarpeta: string): Promise<string[]> {
  const entradas = await readDir(rutaCarpeta);

  return entradas
    .filter((entrada) => !entrada.isDirectory && entrada.name.toLowerCase().endsWith(".tg"))
    .map((entrada) => entrada.name)
    .sort();
}

/** Abre un archivo con el programa asociado del sistema operativo (ej. TuxGuitar). */
export async function abrirArchivo(rutaCarpeta: string, nombreArchivo: string): Promise<void> {
  const separador = rutaCarpeta.includes("\\") ? "\\" : "/";
  const rutaCompleta = `${rutaCarpeta}${separador}${nombreArchivo}`;
  await openPath(rutaCompleta);
}