import { createSelector } from 'reselect';

export const viewSelector = (state) => state.View;

export const selectedCommitSelector = createSelector(
  viewSelector,
  (viewState) => viewState.selectedHash
);
