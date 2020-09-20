import { loadFileContentsFromPath } from './fileSystem';

export const loadUntrackedFilesContents = async (
  untrackedFilePaths: Array<string>,
  gitDir: string
) => {
  const unTrackedFiles = await Promise.all(
    untrackedFilePaths.map(async (filePath: string) => {
      const contents = await loadFileContentsFromPath(gitDir, filePath);
      return {
        filePath: filePath,
        modificationType: 'added',
        afterFileState: '',
        beforeFileState: contents,
      };
    })
  );

  return unTrackedFiles;
};
