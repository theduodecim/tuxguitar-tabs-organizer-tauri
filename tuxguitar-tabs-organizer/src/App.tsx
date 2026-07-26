// src/App.tsx
import { useState, useCallback } from "react";
import {
  recuperarCarpetaGuardada,
  seleccionarNuevaCarpeta,
  listarArchivosTg,
  abrirArchivo,
} from "./lib/folderAccess";
import {
  categorizarArchivos,
  type ArchivoCategorizado,
} from "./lib/categorizar";
import { CATEGORIAS, SIN_CATEGORIA } from "./lib/categorias";
import "./App.css";

interface EstadoCarpeta {
  ruta: string;
  archivos: ArchivoCategorizado[];
}

function elegirAlAzar<T>(lista: T[]): T {
  return lista[Math.floor(Math.random() * lista.length)];
}

/** Agrupa los archivos categorizados por id de categoría. */
function agruparPorCategoria(
  archivos: ArchivoCategorizado[]
): Record<string, ArchivoCategorizado[]> {
  const grupos: Record<string, ArchivoCategorizado[]> = {};
  for (const archivo of archivos) {
    const id = archivo.categoria.id;
    if (!grupos[id]) grupos[id] = [];
    grupos[id].push(archivo);
  }
  return grupos;
}

/** Sortea 1 archivo random de cada categoría técnica (excluye "sin_categoria"). */
function sortearCombinacion(
  grupos: Record<string, ArchivoCategorizado[]>
): ArchivoCategorizado[] {
  const combinacion: ArchivoCategorizado[] = [];
  for (const categoria of CATEGORIAS) {
    const disponibles = grupos[categoria.id];
    if (disponibles && disponibles.length > 0) {
      combinacion.push(elegirAlAzar(disponibles));
    }
  }
  return combinacion;
}

function App() {
  const [estado, setEstado] = useState<EstadoCarpeta | null>(null);
  const [combinacion, setCombinacion] = useState<ArchivoCategorizado[]>([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const escanearCarpeta = useCallback(async (ruta: string) => {
    const nombres = await listarArchivosTg(ruta);
    const archivos = categorizarArchivos(nombres);
    setEstado({ ruta, archivos });
    setCombinacion(sortearCombinacion(agruparPorCategoria(archivos)));
  }, []);

  const manejarSeleccionarCarpeta = useCallback(async () => {
    setError(null);
    setCargando(true);
    try {
      const ruta = await seleccionarNuevaCarpeta();
      if (ruta) {
        await escanearCarpeta(ruta);
      }
    } catch (e) {
      setError("No se pudo leer la carpeta seleccionada.");
      console.error(e);
    } finally {
      setCargando(false);
    }
  }, [escanearCarpeta]);

  const manejarUsarCarpetaGuardada = useCallback(async () => {
    setError(null);
    setCargando(true);
    try {
      const ruta = recuperarCarpetaGuardada();
      if (ruta) {
        await escanearCarpeta(ruta);
      } else {
        setError("No hay ninguna carpeta guardada todavía.");
      }
    } catch (e) {
      setError("No se pudo leer la carpeta guardada. Probá seleccionarla de nuevo.");
      console.error(e);
    } finally {
      setCargando(false);
    }
  }, [escanearCarpeta]);

  const manejarReRoll = useCallback(() => {
    if (!estado) return;
    setCombinacion(sortearCombinacion(agruparPorCategoria(estado.archivos)));
  }, [estado]);

  const manejarAbrirArchivo = useCallback(
    async (nombreArchivo: string) => {
      if (!estado) return;
      try {
        await abrirArchivo(estado.ruta, nombreArchivo);
      } catch (e) {
        setError(`No se pudo abrir "${nombreArchivo}": ${String(e)}`);
        console.error(e);
      }
    },
    [estado]
  );

  const grupos = estado ? agruparPorCategoria(estado.archivos) : {};

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎸 Entrenador de Tabs</h1>
        <div className="botones-carpeta">
          <button onClick={manejarUsarCarpetaGuardada} disabled={cargando}>
            Usar última carpeta
          </button>
          <button onClick={manejarSeleccionarCarpeta} disabled={cargando}>
            Seleccionar carpeta nueva
          </button>
        </div>
        {error && <p className="error">{error}</p>}
      </header>

      {estado && (
        <>
          <section className="combinacion">
            <div className="combinacion-header">
              <h2>Rutina de hoy</h2>
              <button onClick={manejarReRoll}>🎲 Volver a sortear</button>
            </div>
            <div className="grid-cuadrados">
              {combinacion.map((archivo) => (
                <div
                  key={archivo.nombre}
                  className="cuadrado cuadrado-sorteado"
                  onDoubleClick={() => manejarAbrirArchivo(archivo.nombre)}
                  title="Doble click para abrir"
                >
                  <span className="categoria-label">{archivo.categoria.nombre}</span>
                  <span className="nombre-archivo">{archivo.nombre}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="todos-los-archivos">
            <h2>Todos los archivos ({estado.archivos.length})</h2>
            {[...CATEGORIAS, SIN_CATEGORIA].map((categoria) => {
              const archivosDeCategoria = grupos[categoria.id];
              if (!archivosDeCategoria || archivosDeCategoria.length === 0) return null;
              return (
                <div key={categoria.id} className="bloque-categoria">
                  <h3>{categoria.nombre} ({archivosDeCategoria.length})</h3>
                  <div className="grid-cuadrados">
                    {archivosDeCategoria.map((archivo) => (
                      <div
                        key={archivo.nombre}
                        className="cuadrado"
                        onDoubleClick={() => manejarAbrirArchivo(archivo.nombre)}
                        title="Doble click para abrir"
                      >
                        {archivo.nombre}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </section>
        </>
      )}
    </div>
  );
}

export default App;