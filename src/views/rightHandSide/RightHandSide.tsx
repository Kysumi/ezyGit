import React from 'react';
import { FileChangesView } from './fileChanges/FileChangesView';
import CommitMessage from '../../components/commitMessage/CommitMessage';
import { connect } from 'react-redux';
import { getSelectedCommitSelector } from '../../store/view/ViewSelector';
import styled from 'styled-components';

const RigthHandSideDiv = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-row-gap: 1rem;
  padding: 10px;
  width: 100%;
  overflow: auto;
  max-height: calc(100vh - 75px);
  min-height: calc(100vh - 75px);
`;

interface RightHandSideProps {
  message: string;
}

export const RightHandSide = ({ message }: RightHandSideProps) => {
  return (
    <RigthHandSideDiv>
      <CommitMessage message={message} disabled={message !== ''} />
      <FileChangesView />
    </RigthHandSideDiv>
  );
};

const mapStateToProps = (state: any) => {
  const selectedCommit = getSelectedCommitSelector(state);

  return {
    message: selectedCommit.commit.message,
  };
};

export default connect(mapStateToProps)(RightHandSide);
