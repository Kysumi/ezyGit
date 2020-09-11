import { unstageFile, stageFile, discardFile, deleteFile } from '../../git/git';
import {
  gitDirectorySelector,
  getUntrackedFilesSelector,
} from './RepoSelector';
import { loadPendingDiff, setUntrackedFiles } from './Repo';
import { CommitDiff } from '../../components/diffList/type';

const _ = require('lodash');

export const unstageFileThunk = (filePath: string) => async (
  dispatch: any,
  getState: any
) => {
  const result = await unstageFile(gitDirectorySelector(getState()), filePath);

  // If it failed to delete the fail bail out.
  // TODO display notification we couldn't delete the fiel
  if (!result) {
    return;
  }

  dispatch(loadPendingDiff());
};

export const stageFileThunk = (filePath: string) => async (
  dispatch: any,
  getState: any
) => {
  const result = await stageFile(gitDirectorySelector(getState()), filePath);

  // Failed to stage file bail out
  if (!result) {
    return;
  }

  dispatch(loadPendingDiff());
};

export const discardFileThunk = (filePath: string) => async (
  dispatch: any,
  getState: any
) => {
  await discardFile(gitDirectorySelector(getState()), filePath);

  dispatch(loadPendingDiff());
};

export const deleteFileThunk = (filePath: string) => async (
  dispatch: any,
  getState: any
) => {
  const result = deleteFile(gitDirectorySelector(getState()), filePath);

  // If it failed to delete the fail bail out.
  // TODO display notification we couldn't delete the fiel
  if (!result) {
    return;
  }

  const untrackedFiles = getUntrackedFilesSelector(getState());

  const newUntrackedFilesState = _.filter(
    untrackedFiles,
    (item: CommitDiff) => item.filePath !== filePath
  );

  dispatch(setUntrackedFiles(newUntrackedFilesState));
};
