import { createSelector } from 'reselect';

export const viewSelector = (state) => state.View;

export const getSelectedCommitSelector = createSelector(
  viewSelector,
  (viewState) => viewState.selectedCommit
);

export const hasSelectedCommitSelector = createSelector(
  viewSelector,
  (viewState) => viewState.selectedCommit.oid !== null
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

export const omniBarIsOpenSelector = createSelector(
  viewSelector,
  (viewState) => viewState.omniBarIsOpen
);
