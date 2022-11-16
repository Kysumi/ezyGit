import { useState } from "react";
import { HomePage } from "~/module/HomePage/HomePage";
import { OpenDirectoryContext } from "~/module/OpenDirectory/DirectoryContext";

export default function Index() {
  const [state, updateState] = useState<{
    dir: string;
    activeWatcher: () => void;
  }>({
    dir: "",
    activeWatcher: () => null,
  });

  return (
    <div className="bg-gradient-to-br from-indigo-500 to-purple-500 font-sans text-base text-slate-50 min-h-screen">
      <OpenDirectoryContext.Provider
        value={{
          dir: state.dir,
          onChangeDirectory: (dir, watcher) =>
            updateState(() => ({
              activeWatcher: watcher,
              dir,
            })),
          onFolderClosed() {
            state.activeWatcher();
            updateState(() => ({
              dir: "",
              activeWatcher: () => null,
            }));
          },
        }}
      >
        <HomePage />
      </OpenDirectoryContext.Provider>
    </div>
  );
}
