import React from 'react';
import { PendingChangesView } from './PendingChangesView';
import { CommitedChangesView } from './CommitedChangesView';
import { useSelector } from 'react-redux';
import { hasSelectedCommitSelector } from '../../../store/view/ViewSelector';
import { Heading } from 'evergreen-ui';

export const FileChangesView = () => {
  const hasSelectedCommit = useSelector(hasSelectedCommitSelector);
  return (
    <div>
      <Heading>File Changes</Heading>
      {hasSelectedCommit ? <CommitedChangesView /> : <PendingChangesView />}
    </div>
  );
};
