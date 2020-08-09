import React from 'react';
import DiffList from '../../components/diffList/DiffList';
import { getFileStateChanges, getPreviousCommits } from '../../git/git';
import { useSelector } from 'react-redux';
import {
  filePathSelector,
  getCommitsSelector,
  getBranchNameSelector,
} from '../../store/repo/RepoSelector';

export const PendingChangesView = () => {
  const filePath = useSelector(filePathSelector);
  const commits = useSelector(getCommitsSelector);
  const branchName = useSelector(getBranchNameSelector);

  if (commits.length !== 0) {
    // TODO Remove.
    const output = getPreviousCommits(branchName, filePath).then((hashes) => {
      const fileChanges = getFileStateChanges(
        hashes.targetHash,
        hashes.previousHash,
        filePath
      ).then((output) => {
        console.log(output);
      });
    });
  }

  return (
    <div>
      <div>
        <h5>Working Changes</h5>
        <DiffList />
      </div>

      <div>
        <h5>Untracked Files</h5>
        <DiffList />
      </div>
    </div>
  );
};
