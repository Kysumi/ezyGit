import { createSelector } from 'reselect';

export const viewSelector = (state) => state.View;

export const getSelectedCommitSelector = createSelector(
  viewSelector,
  (viewState) => viewState.selectedCommit
);

export const getSelectdCommitHashSelector = createSelector(
  getSelectedCommitSelector,
  (selectedCommit) => {
    if (selectedCommit === null) {
      return null;
    }

    return selectedCommit.oid;
  }
);

export const pendingCommitMessageSelector = createSelector(
  viewSelector,
  (viewState) => viewState.pendingCommitMessage
);
