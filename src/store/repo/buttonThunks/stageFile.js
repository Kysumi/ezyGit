import { gitDirectorySelector } from '../RepoSelector';
import { stageFile } from '../../../git/git';
import { loadPendingDiff } from '../Repo';

export const stageFileThunk = (filePath) => async (dispatch, getState) => {
  const result = await stageFile(gitDirectorySelector(getState()), filePath);

  // Failed to stage file bail out
  if (!result) {
    return;
  }

  dispatch(loadPendingDiff());
};
