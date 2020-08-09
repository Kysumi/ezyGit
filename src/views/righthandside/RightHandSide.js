import React from 'react';
import { FileChangesView } from '../fileChanges/FileChangesView';
import { CommitMessage } from '../../components/commitMessage/CommitMessage';

const rightHandSideStyle = {
  padding: '10px',
  width: '100%',
  overflow: 'auto',
  maxHeight: 'calc(100vh - 60px)',
  minHeight: 'calc(100vh - 60px)',
};

export const RightHandSide = () => {
  return (
    <div style={rightHandSideStyle}>
      <CommitMessage />
      <FileChangesView />
    </div>
  );
};
