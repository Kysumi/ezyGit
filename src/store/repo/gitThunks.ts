import {
  unstageFile,
  stageFile,
  discardFile,
  deleteFile,
  commitChanges,
  pullChanges,
} from '../../git/git';
import {
  gitDirectorySelector,
  getUntrackedFilesSelector,
  getBranchNameSelector,
} from './RepoSelector';
import { loadPendingDiff, setUntrackedFiles, loadCommits } from './Repo';
import { CommitDiff } from '../../components/diffList/type';
import { toaster } from 'evergreen-ui';

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

export const commitThunk = (message: string) => async (
  dispatch: any,
  getState: any
) => {
  try {
    await commitChanges(gitDirectorySelector(getState()), message);
  } catch (error) {
    toaster.warning(error.message);
  }

  dispatch(loadCommits());
  dispatch(loadPendingDiff());
};

export const pullThunk = () => async (dispatch: any, getState: any) => {
  const worker = new Worker();

  worker.onmessage = (event: any) => {
    console.log(event.data);
    console.log('Message came back we looooooooooooooooooooooooooooooping');
  };

  const data = {
    gitDir: gitDirectorySelector(getState()),
    gitBranch: getBranchNameSelector(getState()),
  };

  worker.postMessage(JSON.stringify(data));

  // try {
  //   await pullChanges(
  //     gitDirectorySelector(getState()),
  //     getBranchNameSelector(getState())
  //   );
  // } catch (error) {
  //   toaster.warning(error.message);
  //   return;
  // }

  // toaster.success('Pulled the latest changes!');

  // dispatch(loadPendingDiff());
};
