import React from 'react';
import DiffList from '../../../components/diffList/DiffList';
import { useSelector } from 'react-redux';
import { getCurrentBranchDiffs } from '../../../store/repo/RepoSelector';

export const CommitedChangesView = () => {
  const diffs = useSelector(getCurrentBranchDiffs);

  return (
    <div>
      <DiffList items={diffs} />
    </div>
  );
};
