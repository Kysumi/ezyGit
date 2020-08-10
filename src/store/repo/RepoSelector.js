import { createSelector } from 'reselect';
import {
  pendingCommitMessageSelector,
  selectedCommitSelector,
} from '../view/ViewSelector';

export const repoSelector = (state) => state.Repo;

export const filePathSelector = createSelector(
  repoSelector,
  (repoState) => repoState.filePath
);

export const getCommitsSelector = createSelector(
  repoSelector,
  (repoState) => repoState.commits
);

export const pendingCommitSelector = createSelector(
  pendingCommitMessageSelector,
  (pendingCommitMessage) => {
    return {
      oid: null,
      commit: {
        message: pendingCommitMessage,
        committer: {
          name: null,
          email: null,
        },
      },
    };
  }
);

/**
 * Returns the same data as the getCommitsSelector but with the current
 * users commit object at the start of the array
 */
export const getCommitListItems = createSelector(
  getCommitsSelector,
  pendingCommitSelector,
  (commits, pendingCommitMessage) => {
    return [pendingCommitMessage, ...commits];
  }
);

export const getBranchNameSelector = createSelector(
  repoSelector,
  (repoState) => repoState.currentBranch
);

export const getCurrentBranchDiffs = createSelector(
  repoSelector,
  (repoState) => repoState.currentBranchDiffs
);

export const getCommitIndexByHashSelector = createSelector(
  getCommitListItems,
  selectedCommitSelector,
  (commitList, hash) => commitList.findIndex((item) => item.oid === hash)
);
