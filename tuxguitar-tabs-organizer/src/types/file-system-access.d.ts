// src/types/file-system-access.d.ts
// Tipos mínimos para la File System Access API, que TypeScript
// todavía no incluye en su lib.dom.d.ts por defecto.

export {};

declare global {
  type FileSystemPermissionMode = "read" | "readwrite";

  interface FileSystemPermissionDescriptor {
    mode?: FileSystemPermissionMode;
  }

  interface FileSystemHandlePermissions {
    queryPermission(
      descriptor?: FileSystemPermissionDescriptor
    ): Promise<PermissionState>;
    requestPermission(
      descriptor?: FileSystemPermissionDescriptor
    ): Promise<PermissionState>;
  }

  interface FileSystemHandle {
    readonly kind: "file" | "directory";
    readonly name: string;
    isSameEntry(other: FileSystemHandle): Promise<boolean>;
  }

  interface FileSystemFileHandle extends FileSystemHandle, FileSystemHandlePermissions {
    readonly kind: "file";
    getFile(): Promise<File>;
  }

  interface FileSystemDirectoryHandle extends FileSystemHandle, FileSystemHandlePermissions {
    readonly kind: "directory";
    values(): AsyncIterableIterator<FileSystemFileHandle | FileSystemDirectoryHandle>;
    entries(): AsyncIterableIterator<[string, FileSystemFileHandle | FileSystemDirectoryHandle]>;
    keys(): AsyncIterableIterator<string>;
    getFileHandle(name: string, options?: { create?: boolean }): Promise<FileSystemFileHandle>;
    getDirectoryHandle(name: string, options?: { create?: boolean }): Promise<FileSystemDirectoryHandle>;
  }

  interface Window {
    showDirectoryPicker(options?: {
      mode?: FileSystemPermissionMode;
    }): Promise<FileSystemDirectoryHandle>;
  }
}