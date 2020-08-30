import { unstageFile } from '../../../git/git';
import { gitDirectorySelector } from '../RepoSelector';
import { loadPendingDiff } from '../Repo';

export const unstageFileThunk = (filePath) => async (dispatch, getState) => {
  const result = await unstageFile(gitDirectorySelector(getState()), filePath);

  // If it failed to delete the fail bail out.
  // TODO display notification we couldn't delete the fiel
  if (!result) {
    return;
  }

  dispatch(loadPendingDiff());
};
