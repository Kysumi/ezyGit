import { useEffect, useState } from "react";
import {
  DebouncedEvent,
  DebouncedWatchOptions,
} from "../FileWatcher/FileWatcher";
import { useOpenDirectoryContext } from "./DirectoryContext";

type Watcher = (
  paths: string | string[],
  options: DebouncedWatchOptions,
  cb: (event: DebouncedEvent) => void
) => void;

const funct = async (dir: string) => {
  const { watch } = require("~/module/FileWatcher") as { watch: Watcher };

  return await watch(dir, { recursive: true }, (event: DebouncedEvent) => {
    const { type, payload } = event;
    console.log(type, payload);
  });
};

export const OpenDirectory = () => {
  const { dir } = useOpenDirectoryContext();

  const [stopSwatching] = useState(funct(dir));

  const startWatcher = async () => {
    console.log("watcher started");
  };

  useEffect(() => {
    startWatcher();
    () => {
      console.log("stop watching");
      stopSwatching?.();
    };
  }, []);

  return <div>Current DIR {dir}</div>;
};
