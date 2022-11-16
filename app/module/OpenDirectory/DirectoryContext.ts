import { createContext, useContext } from "react";

interface OpenDirectory {
  dir: string;
  onChangeDirectory: (dir: string, watcher: () => void) => void;
  onFolderClosed: () => void;
}

export const OpenDirectoryContext = createContext<OpenDirectory | null>(null);

export const useOpenDirectoryContext = (): OpenDirectory => {
  const ctx = useContext(OpenDirectoryContext);

  if (ctx === null) {
    throw "Using OpenDirectoryContext outside of the provider";
  }

  return ctx;
};
