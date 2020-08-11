import React from 'react';
import DiffList from '../../../components/diffList/DiffList';
import { useSelector } from 'react-redux';
import {
  getCurrentBranchDiffs,
  getUntrackedFilesSelector,
} from '../../../store/repo/RepoSelector';

export const PendingChangesView = () => {
  const diffs = useSelector(getCurrentBranchDiffs);
  const pendingFiles = useSelector(getUntrackedFilesSelector);

  return (
    <div>
      <div>
        <h5>Working Changes</h5>
        <DiffList items={diffs} />
      </div>

      <div>
        <h5>Untracked Files</h5>
        <DiffList items={pendingFiles} />
      </div>
    </div>
  );
};
