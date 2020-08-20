import { loadWorkingFileChanges } from './git';

export const loadUntrackedFilesContents = async (
  untrackedFilePaths,
  gitDir
) => {
  const unTrackedFiles = await Promise.all(
    untrackedFilePaths.map(async (filePath) => {
      const contents = await loadWorkingFileChanges(gitDir, filePath);
      return {
        filePath: `/${filePath}`,
        modificationType: 'added',
        aHash: '',
        bHash: '',
        aFileContents: '',
        bFileContents: contents,
      };
    })
  );

  return unTrackedFiles;
};
