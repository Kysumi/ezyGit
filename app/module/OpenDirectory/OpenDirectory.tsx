import { watch } from "tauri-plugin-fs-watch-api";
import { useEffect, useState } from "react";
import { useOpenDirectoryContext } from "./DirectoryContext";

export const OpenDirectory = () => {
  const [stopSwatching, setStopWatching] =
    useState<() => Promise<void> | null>();

  const { dir } = useOpenDirectoryContext();

  const startWatcher = async () => {
    const stop = await watch(dir, { recursive: true }, (event) => {
      const { type, payload } = event;
      console.log(type, payload);
    });
    setStopWatching(stop);
  };

  useEffect(() => {
    startWatcher();
    () => {
      stopSwatching?.();
    };
  });

  return <div>Current DIR {dir}</div>;
};
