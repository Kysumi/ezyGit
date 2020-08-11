import React from 'react';
import { FileChangesView } from './fileChanges/FileChangesView';
import { CommitMessage } from '../../components/commitMessage/CommitMessage';
import { connect } from 'react-redux';
import { getSelectedCommitDetails } from '../../store/repo/RepoSelector';
import { selectedCommitSelector } from '../../store/view/ViewSelector';

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
  let message = '';
  const selectedCommitHash = selectedCommitSelector(state);

  if (selectedCommitHash) {
    console.log(selectedCommitHash);
    const commit = getSelectedCommitDetails(state);
    message = commit.message;
  }

  return {
    message,
  };
};

export default connect(mapStateToProps)(RightHandSide);
