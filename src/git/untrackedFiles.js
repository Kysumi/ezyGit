import { loadFileContentsFromPath } from './git';

export const loadUntrackedFilesContents = async (
  untrackedFilePaths,
  gitDir
) => {
  const unTrackedFiles = await Promise.all(
    untrackedFilePaths.map(async (filePath) => {
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
