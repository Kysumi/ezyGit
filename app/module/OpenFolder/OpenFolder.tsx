import { open } from "@tauri-apps/api/dialog";
import { useOpenDirectoryContext } from "../OpenDirectory/DirectoryContext";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { Button } from "~/components/button";
import { useState } from "react";
import {
  DebouncedEvent,
  DebouncedWatchOptions,
} from "~/module/FileWatcher/FileWatcher";

type Watcher = (
  paths: string | string[],
  options: DebouncedWatchOptions,
  cb: (event: DebouncedEvent) => void
) => Promise<() => Promise<void>>;

const startWatcher = async (dir: string) => {
  const { watch } = require("~/module/FileWatcher") as { watch: Watcher };

  return watch(dir, { recursive: true }, (event: DebouncedEvent) => {
    const { type, payload } = event;
    console.log(type, payload);
  });
};

export const OpenFolder = () => {
  const { onChangeDirectory } = useOpenDirectoryContext();
  const [alertOpen, setAlertOpen] = useState(false);

  const openDirSelector = async () => {
    // Open a selection dialog for directories
    const selected = await open({
      directory: true,
      multiple: false,
    });

    if (selected === null) {
      setAlertOpen(true);
    } else if (typeof selected === "string") {
      onChangeDirectory(selected, await startWatcher(selected));
    }
  };

  return (
    <div>
      <AlertDialog.Root open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialog.Portal>
          <AlertDialog.Overlay>
            <AlertDialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-50 rounded-md p-5">
              <AlertDialog.Title className="font-medium text-lg">
                Error
              </AlertDialog.Title>
              <AlertDialog.Description className="mt-6 mb-6">
                No git project found in selected directory
              </AlertDialog.Description>
              <div className="flex gap-7 justify-end">
                <AlertDialog.Cancel asChild>
                  <Button variant="danger">Cancel</Button>
                </AlertDialog.Cancel>
                <AlertDialog.Action asChild>
                  <Button className="bg-blue-400">Wump wump</Button>
                </AlertDialog.Action>
              </div>
            </AlertDialog.Content>
          </AlertDialog.Overlay>
        </AlertDialog.Portal>
      </AlertDialog.Root>
      <Button onClick={openDirSelector}>Select File DIR</Button>
    </div>
  );
};
