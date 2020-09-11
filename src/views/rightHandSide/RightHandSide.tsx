import React from 'react';
import { FileChangesView } from './fileChanges/FileChangesView';
import CommitMessage from '../../components/commitMessage/CommitMessage';
import { connect } from 'react-redux';
import { getSelectedCommitSelector } from '../../store/view/ViewSelector';
import styled from 'styled-components';

const RigthHandSideDiv = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  grid-row-gap: 1rem;
  padding: 0.3rem;
  width: 100%;
  overflow: auto;
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
