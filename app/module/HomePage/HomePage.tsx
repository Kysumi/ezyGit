import { OpenFolder } from "~/module/OpenFolder/OpenFolder";
import { useOpenDirectoryContext } from "../OpenDirectory/DirectoryContext";
import { OpenDirectory } from "../OpenDirectory/OpenDirectory";
import { ClientOnly } from "remix-utils";

export const HomePage: React.FC = () => {
  const { dir } = useOpenDirectoryContext();
  console.log(dir);
  return (
    <div>
      Some Home page shiz
      <h1 className="text-3xl font-bold">ezyGit</h1>
      <OpenFolder />
      <ClientOnly>{() => <>{dir && <OpenDirectory />}</>}</ClientOnly>
    </div>
  );
};
