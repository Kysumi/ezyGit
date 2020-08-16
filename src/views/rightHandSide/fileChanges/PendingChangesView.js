import React from 'react';
import DiffList from '../../../components/diffList/DiffList';
import { useSelector } from 'react-redux';
import {
  getCurrentBranchDiffs,
  getUntrackedFilesSelector,
  getStagedFilesSelector,
} from '../../../store/repo/RepoSelector';

export const PendingChangesView = () => {
  const diffs = useSelector(getCurrentBranchDiffs);
  const pendingFiles = useSelector(getUntrackedFilesSelector);
  const stagedFiles = useSelector(getStagedFilesSelector);

  return (
    <div>
      <div>
        <h4>Working Changes</h4>
        <DiffList items={diffs} />
      </div>
      <div>
        <h4>Staged Changes</h4>
        <DiffList items={stagedFiles} />
      </div>
      <div>
        <h4>Untracked Files</h4>
        <DiffList items={pendingFiles} />
      </div>
    </div>
  );
};
