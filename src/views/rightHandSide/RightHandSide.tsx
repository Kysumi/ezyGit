import React from 'react';
import { FileChangesView } from './fileChanges/FileChangesView';
import CommitMessage from '../../components/commitMessage/CommitMessage';
import { connect } from 'react-redux';
import { getSelectedCommitSelector } from '../../store/view/ViewSelector';
import styled from 'styled-components';

const RigthHandSideDiv = styled.div`
  padding: 10px;
  width: 100%;
  overflow: auto;
  max-height: calc(100vh - 60px);
  min-height: calc(100vh - 60px);
`;

const Spacing = styled.div`
  padding-bottom: 20px;
`;

interface RightHandSideProps {
  message: string;
}

export const RightHandSide = ({ message }: RightHandSideProps) => {
  return (
    <RigthHandSideDiv>
      <Spacing>
        <CommitMessage message={message} disabled={message !== ''} />
      </Spacing>
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
