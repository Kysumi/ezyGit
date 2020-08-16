import React from 'react';
import { FileChangesView } from './fileChanges/FileChangesView';
import { CommitMessage } from '../../components/commitMessage/CommitMessage';
import { connect } from 'react-redux';
import { getSelectedCommitSelector } from '../../store/view/ViewSelector';

const rightHandSideStyle = {
  padding: '10px',
  width: '100%',
  overflow: 'auto',
  maxHeight: 'calc(100vh - 60px)',
  minHeight: 'calc(100vh - 60px)',
};

export const RightHandSide = ({ message }) => {
  return (
    <div style={rightHandSideStyle}>
      <CommitMessage message={message} disabled={message !== ''} />
      <FileChangesView />
    </div>
  );
};

const mapStateToProps = (state) => {
  const selectedCommit = getSelectedCommitSelector(state);

  return {
    message: selectedCommit.commit.message,
  };
};

export default connect(mapStateToProps)(RightHandSide);
