# TuxGuitar Tabs Organizer

App de escritorio (Tauri + React) para organizar y practicar tabs de guitarra (.tg) agrupados por categoría, con sorteo de rutina diaria.

## Requisitos

- [TuxGuitar](https://tuxguitar.app) instalado y asociado a archivos `.tg`

## Instalación (Windows)

1. Descargar el instalador (.msi o .exe) desde [Releases](#) o desde el artifact del último build en Actions.
2. Ejecutar el instalador.
3. Al abrir por primera vez, click en "Seleccionar carpeta nueva" y elegir la carpeta donde tenés tus tabs.

## Uso

- **Rutina de hoy**: sortea automáticamente un archivo por categoría.
- **Volver a sortear**: genera una nueva rutina aleatoria.
- Doble-click en cualquier archivo lo abre directamente en TuxGuitar.

## Desarrollo

\`\`\`bash
npm install
npm run tauri dev
\`\`\`

## Build

El build de Windows se genera vía GitHub Actions (`.github/workflows/build.yml`), disparado en cada push a `main` o manualmente desde la pestaña Actions.
