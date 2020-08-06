import { createSelector } from 'reselect';

export const repoSelector = (state) => state.Repo;

export const filePathSelector = createSelector(
  repoSelector,
  (repoState) => repoState.filePath
);

export const getCommitsSelector = createSelector(
  repoSelector,
  (repoState) => repoState.commits
);

export const getBranchNameSelector = createSelector(
  repoSelector,
  (repoState) => repoState.currentBranch
);
