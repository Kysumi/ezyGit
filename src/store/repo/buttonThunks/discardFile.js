import { discardFile } from '../../../git/git';
import { gitDirectorySelector } from '../RepoSelector';
import { loadPendingDiff } from '../Repo';

export const discardFileThunk = (filePath) => async (dispatch, getState) => {
  await discardFile(gitDirectorySelector(getState()), filePath);

  dispatch(loadPendingDiff());
};
