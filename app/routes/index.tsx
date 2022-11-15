import { useState } from "react";
import { HomePage } from "~/module/HomePage/HomePage";
import { OpenDirectoryContext } from "~/module/OpenDirectory/DirectoryContext";

export default function Index() {
  const [dir, setDir] = useState("");
  return (
    <div className="bg-gradient-to-br from-indigo-500 to-purple-500 font-sans text-base text-slate-50 min-h-screen">
      <OpenDirectoryContext.Provider
        value={{ dir: dir, onChangeDirectory: setDir }}
      >
        <HomePage />
      </OpenDirectoryContext.Provider>
    </div>
  );
}
