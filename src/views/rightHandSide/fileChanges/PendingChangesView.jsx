import React from 'react';
import { useSelector } from 'react-redux';
import {
  getCurrentBranchDiffs,
  getUntrackedFilesSelector,
  getStagedFilesSelector,
} from '../../../store/repo/RepoSelector';
import { DiffCollection } from '../../../components/diffList/DiffCollection';
import { DiffTypeEnum } from '../../../components/diffList/DiffList';

export const PendingChangesView = () => {
  const diffs = useSelector(getCurrentBranchDiffs);
  const pendingFiles = useSelector(getUntrackedFilesSelector);
  const stagedFiles = useSelector(getStagedFilesSelector);

  return (
    <div>
      <DiffCollection
        title={'Working Changes'}
        diffs={diffs}
        diffType={DiffTypeEnum.working}
      />
      <DiffCollection
        title={'Staged Changes'}
        diffs={stagedFiles}
        diffType={DiffTypeEnum.staged}
      />
      <DiffCollection
        title={'Untracked Files'}
        diffs={pendingFiles}
        diffType={DiffTypeEnum.untracked}
      />
    </div>
  );
};
