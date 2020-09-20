import { readContentsFromHash } from './git';
import git, { WalkerEntry } from 'isomorphic-git';
import { CommitDiff, ModificationType } from '../components/diffList/type';
import { isLargeFile } from '../helper/lineCount';
import * as fs from 'fs';
import * as _ from 'lodash';

interface StagedFileContents {
  filePath: string;
  contents: string;
}

/**
 * Helper function that loads the contents of all of the staged files
 */
const getStagedFileContents = async (
  gitDir: string,
  stagedFilePaths: Array<string>
): Promise<Array<StagedFileContents>> => {
  const map = async (filePath: string, entries: WalkerEntry[] | null) => {
    if (entries === null) {
      return;
    }

    if (stagedFilePaths.includes(filePath)) {
      const contents = await readContentsFromHash(
        await entries[0].oid(),
        gitDir
      );

      return {
        filePath: filePath,
        contents,
      };
    }
  };

  return await git.walk({
    fs,
    dir: gitDir,
    trees: [git.STAGE()],
    map,
  });
};

/**
 * Loads the contents of a file from the hash
 */
const loadContentsFromPreviousCommit = async (
  staged: StagedFileContents,
  commitHash: string,
  gitDir: string
): Promise<CommitDiff> => {
  let commitedState = '';
  try {
    commitedState = await readContentsFromHash(
      commitHash,
      gitDir,
      staged.filePath
    );
  } catch (e) {
    console.log(
      'Failed to load previously committed state. This is likely due to it being a new file',
      e
    );
  }

  return {
    filePath: staged.filePath,
    modificationType: ModificationType.added,
    afterFileState: commitedState,
    beforeFileState: staged.contents,
    largeFileDiff: isLargeFile(staged.contents),
  };
};

/**
 * Loads the staged file contents
 */
export const loadStagedDetails = async (
  stagedFiles: Array<string>,
  gitDir: string,
  commitHash: string
) => {
  const stagedFileContents = await getStagedFileContents(gitDir, stagedFiles);

  const linkedStagedContents = await Promise.all(
    stagedFileContents.map(async (staged) => {
      return await loadContentsFromPreviousCommit(staged, commitHash, gitDir);
    })
  );

  return linkedStagedContents;
};

/**
 * Will move the workingFileContents comparison from the previously
 * committed state of the file to compare against the currently staged
 * state.
 */
export const mapWorkingChangesToStagedChanges = (
  stagedFileContents: Array<CommitDiff>,
  workingFileContents: Array<CommitDiff>
): Array<CommitDiff> => {
  const newWorkingChanges = workingFileContents.map((workingChanges) => {
    const stagedChanges = _.find(stagedFileContents, {
      filePath: workingChanges.filePath,
    });

    if (stagedChanges) {
      return {
        ...workingChanges,
        afterFileState: stagedChanges.beforeFileState,
      };
    }

    return workingChanges;
  });

  return newWorkingChanges;
};
