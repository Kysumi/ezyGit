import React from 'react';
import DiffList from '../../../components/diffList/DiffList';
import { useSelector } from 'react-redux';
import { getCurrentBranchDiffs } from '../../../store/repo/RepoSelector';

export const PendingChangesView = () => {
  const diffs = useSelector(getCurrentBranchDiffs);
  return (
    <div>
      <div>
        <h5>Working Changes</h5>
        <DiffList items={diffs} />
      </div>

      <div>
        <h5>Untracked Files</h5>
        <DiffList />
      </div>
    </div>
  );
};
