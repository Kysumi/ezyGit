import React from 'react';
import { PendingChangesView } from './PendingChangesView';
import { CommitedChangesView } from './CommitedChangesView';
import { useSelector } from 'react-redux';
import { selectedCommitSelector } from '../../store/view/ViewSelector';

export const FileChangesView = () => {
  const hasSelectedCommit = useSelector(selectedCommitSelector);
  return (
    <div>
      <h3>File Changes</h3>
      {hasSelectedCommit ? <CommitedChangesView /> : <PendingChangesView />}
    </div>
  );
};
