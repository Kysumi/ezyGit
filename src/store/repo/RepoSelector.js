import { createSelector } from 'reselect';

export const filePathSelector = (state) => state.Repo.filePath;
export const getCommits = (state) => state.Repo.commits;
