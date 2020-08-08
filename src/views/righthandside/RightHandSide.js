import React from 'react';
import { FileChangesView } from '../filechanges/FileChangesView';
import { CommitMessage } from '../../components/commitmessage/CommitMessage';

const rightHandSideStyle = {
  paddingLeft: '10px',
  width: '100%',
};

export const RightHandSide = () => {
  return (
    <div style={rightHandSideStyle}>
      <CommitMessage />
      <FileChangesView />
    </div>
  );
};
