import { deleteFile } from '../../../git/git';
import {
  gitDirectorySelector,
  getUntrackedFilesSelector,
} from '../RepoSelector';
import { setUntrackedFiles } from '../Repo';

const _ = require('lodash');

export const deleteFileThunk = (filePath) => async (dispatch, getState) => {
  const result = await deleteFile(gitDirectorySelector(getState()), filePath);

  // If it failed to delete the fail bail out.
  // TODO display notification we couldn't delete the fiel
  if (!result) {
    return;
  }

  const untrackedFiles = getUntrackedFilesSelector(getState());

  const newUntrackedFilesState = _.filter(
    untrackedFiles,
    (item) => item.filePath !== filePath
  );

  dispatch(setUntrackedFiles(newUntrackedFilesState));
};
