import React from 'react';
import { useSelector } from 'react-redux';
import {
  getCurrentBranchDiffs,
  getUntrackedFilesSelector,
  getStagedFilesSelector,
} from '../../../store/repo/RepoSelector';
import { DiffCollection } from '../../../components/diffList/DiffCollection';

export const PendingChangesView = () => {
  const diffs = useSelector(getCurrentBranchDiffs);
  const pendingFiles = useSelector(getUntrackedFilesSelector);
  const stagedFiles = useSelector(getStagedFilesSelector);

  return (
    <div>
      <DiffCollection
        title={'Working Changes'}
        diffs={diffs}
        diffType={'working'}
      />
      <DiffCollection
        title={'Staged Changes'}
        diffs={stagedFiles}
        diffType={'staged'}
      />
      <DiffCollection
        title={'Untracked Files'}
        diffs={pendingFiles}
        diffType={'untracked'}
      />
    </div>
  );
};
