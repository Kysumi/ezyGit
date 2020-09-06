import React from 'react';
import { useSelector } from 'react-redux';
import { getBranchNameSelector } from '../../store/repo/RepoSelector';
import { Button, GitCommitIcon, Heading } from 'evergreen-ui';
import styled from 'styled-components';

const AppBarContainer = styled.div`
  background-color: ${(props) => props.theme.mainColor};
  display: flex;
  flex-direction: row;
  margin-left: 5px;
  margin-right: 5px;
`;

const AppTitle = styled.div`
  display: flex;
  flex-direction: row;
  width: 25%;
`;

const CentreContent = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  border: 5px;
  align-items: center;
`;

const RightHandSide = styled.div`
  display: flex;
  flex-direction: row;
  width: 25%;
  justify-content: flex-end;
  align-items: center;
`;

export const AppBar = () => {
  const branchName = useSelector(getBranchNameSelector);

  return (
    <AppBarContainer>
      <AppTitle>
        <Heading size={900}>
          <b>ezyGit</b>
        </Heading>
      </AppTitle>

      <CentreContent>
        <Heading size={500}>
          Branch: <b>{branchName}</b>
        </Heading>
      </CentreContent>

      <RightHandSide>
        <Button iconBefore={GitCommitIcon}>Commit</Button>
      </RightHandSide>
    </AppBarContainer>
  );
};
