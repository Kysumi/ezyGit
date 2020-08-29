import {
  gitDirectorySelector,
  getCurrentBranchDiffs,
  getStagedFilesSelector,
} from '../RepoSelector';
import { stageFile } from '../../../git/git';
import { setCurrentDiffs, setStagedFiles } from '../Repo';

const _ = require('lodash');

export const stageFileThunk = (filePath) => async (dispatch, getState) => {
  const result = await stageFile(gitDirectorySelector(getState()), filePath);

  // Failed to stage file bail out
  if (!result) {
    return;
  }

  // get the current file changes and remove the file just staged and set the new state
  const previousState = getCurrentBranchDiffs(getState());

  const newState = _.filter(
    previousState,
    (item) => item.filePath !== filePath
  );

  dispatch(setCurrentDiffs(newState));

  // move that file we filtered out into the staged array
  const newStagedDetails = _.find(previousState, {
    filePath: filePath,
  });
  const stagedState = getStagedFilesSelector(getState());

  dispatch(setStagedFiles([...stagedState, newStagedDetails]));
};
