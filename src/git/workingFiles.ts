import { CommitDiff, ModificationType } from '../components/diffList/type';
import { isLargeFile } from '../helper/lineCount';
import { loadFileContentsFromPath } from './fileSystem';
import { readContentsFromHash } from './git';

/**
 * Loads the contents of the files from the directory and will
 * link it against the previously committed version if it is present
 *
 * @param {Array} filePaths
 * @param {string} gitDir
 * @param {string} commitHash
 */
export const loadWorkingFileContents = async (
  filePaths: Array<string>,
  gitDir: string,
  commitHash: string
): Promise<Array<CommitDiff>> => {
  const fileDiffs = await Promise.all(
    filePaths.map(
      async (filePath): Promise<CommitDiff> => {
        const newFileChanges = await loadFileContentsFromPath(gitDir, filePath);

        // Because we are looking at pending changes we won't have a commit hash.
        // So we will use the first hash from the store
        let commitedState = '';
        try {
          commitedState = await readContentsFromHash(
            commitHash,
            gitDir,
            filePath
          );
        } catch {
          console.log(
            `failed to load the commited verions of ${filePath}. This is likely because it was committed in the previous commit`
          );
        }

        return {
          filePath: filePath,
          modificationType: ModificationType.added,
          afterFileState: commitedState,
          beforeFileState: newFileChanges,
          largeFileDiff: isLargeFile(newFileChanges),
        };
      }
    )
  );

  return fileDiffs;
};
