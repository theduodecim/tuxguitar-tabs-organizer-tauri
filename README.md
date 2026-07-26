# 🎸 TuxGuitar Tabs Organizer

Aplicación de escritorio construida con **Tauri + React + TypeScript** para organizar, categorizar y practicar tablaturas de guitarra (`.tg`) de forma estructurada, con generación de rutinas diarias aleatorias.

Pensada para guitarristas que acumulan decenas (o cientos) de archivos de práctica sueltos en una carpeta y necesitan una forma rápida de elegir qué practicar hoy sin perder tiempo buscando manualmente.

---

## ✨ Features

- **Selección de carpeta local**: apunta la app a tu carpeta de tabs y detecta automáticamente todos los archivos `.tg`.
- **"Usar última carpeta"**: recuerda la última ubicación seleccionada para no tener que elegirla cada vez que abrís la app.
- **Categorización automática por nombre de archivo**, agrupando ejercicios en secciones como:
  - Sweep Picking
  - Fretboard Crawler
  - Licks
  - Power Chords
  - Arpegios
  - Warm Up
  - Shred / Patterns
  - Tapping
  - Rhythm
  - Octavas / Intervalos
- **Rutina de hoy**: sortea automáticamente un archivo aleatorio por categoría, armando una rutina de práctica variada sin repetir siempre lo mismo.
- **Volver a sortear**: regenera la rutina del día con un solo click si querés otra combinación.
- **Listado completo navegable** de todos los archivos organizados por categoría, con contador total de archivos.
- **Apertura directa con doble-click**: cada archivo se abre automáticamente en TuxGuitar (o el programa asociado a `.tg` en el sistema), sin pasos intermedios.
- **Multiplataforma vía Tauri**: build nativo liviano (sin overhead de Electron), generado automáticamente para Windows mediante GitHub Actions.

---

## 🖥️ Stack técnico

| Capa | Tecnología |
|---|---|
| Frontend | React 19 + TypeScript + Vite |
| Backend / Runtime nativo | Rust + Tauri v2 |
| Acceso a filesystem | `@tauri-apps/plugin-fs` |
| Selección de carpetas | `@tauri-apps/plugin-dialog` |
| Apertura de archivos externos | `@tauri-apps/plugin-opener` |
| CI/CD | GitHub Actions (build automático de instalador Windows) |

---

## 📦 Instalación (usuario final — Windows)

1. Asegurate de tener [TuxGuitar](https://tuxguitar.app) instalado.
2. Descargá el instalador (`.msi` o `.exe`) desde la sección [Releases](../../releases) o desde el artifact generado en la pestaña **Actions** del repo.
3. Ejecutá el instalador.
4. Al abrir la app por primera vez, usá **"Seleccionar carpeta nueva"** y elegí la carpeta donde tenés guardados tus archivos `.tg`.
5. *(Recomendado)* Asociá manualmente `.tg` a TuxGuitar en Windows (`Configuración → Aplicaciones → Aplicaciones predeterminadas`) para que el doble-click dentro de la app abra el archivo automáticamente.

---

## 🛠️ Desarrollo

### Requisitos

- Node.js 20+
- Rust (toolchain estable) + Cargo
- Dependencias de sistema de Tauri v2 según tu OS ([guía oficial](https://tauri.app/start/prerequisites/))

### Correr en modo desarrollo

```bash
npm install
npm run tauri dev
```

### Build local

```bash
npm run tauri build
```

### Build de Windows vía CI

El workflow en `.github/workflows/build.yml` compila automáticamente un instalador de Windows (`.msi` y `.exe`) en cada push a `main`, o manualmente desde la pestaña **Actions → Run workflow**. El artifact resultante queda disponible para descarga directa desde esa misma ejecución.

---

## 🔐 Permisos de Tauri (capabilities)

La app usa un modelo de permisos explícito (Tauri v2). Los permisos habilitados en `src-tauri/capabilities/default.json` cubren:

- Lectura de directorios y archivos de texto (`fs:allow-read-dir`, `fs:allow-read-text-file`, `fs:allow-exists`)
- Scope de filesystem amplio para permitir cualquier carpeta elegida por el usuario
- Apertura de archivos con la aplicación externa asociada por el sistema operativo (`opener:allow-open-path`)
- Diálogo nativo de selección de carpetas (`dialog:default`)

---

## 📋 Roadmap / ideas a futuro

- [ ] Historial de rutinas practicadas
- [ ] Marcar ejercicios como favoritos o completados
- [ ] Soporte multiplataforma (macOS / Linux) en releases oficiales
- [ ] Filtro/búsqueda por nombre dentro del listado completo

---

## 📄 Licencia

Proyecto personal — uso libre para fines de práctica y aprendizaje.
