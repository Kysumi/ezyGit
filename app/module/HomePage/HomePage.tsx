import { OpenFolder } from "~/module/OpenFolder/OpenFolder";
import { useOpenDirectoryContext } from "../OpenDirectory/DirectoryContext";

export const HomePage: React.FC = () => {
  const { dir } = useOpenDirectoryContext();
  return (
    <div>
      Some Home page shiz
      <h1 className="text-3xl font-bold">ezyGit</h1>
      <OpenFolder />
      ACTIVE DIR: {dir}
    </div>
  );
};
