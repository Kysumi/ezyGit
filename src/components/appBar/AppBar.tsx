import React from 'react';
import { useSelector } from 'react-redux';
import { getBranchNameSelector } from '../../store/repo/RepoSelector';
import { Heading } from 'evergreen-ui';
import styled from 'styled-components';
import { RightHandSide } from './RightHandSide';

const AppBarContainer = styled.div`
  background-color: ${(props) => props.theme.mainColor};
  box-shadow: 2px 2px 9px 0px rgba(50, 50, 50, 0.4);
`;

const AppTitle = styled.div`
  display: flex;
  flex-direction: row;
  width: 25%;
  align-items: center;
`;

const CentreContent = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  border: 5px;
  align-items: center;
`;

const ContentContainer = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
  display: flex;
  flex-direction: row;
`;

export const AppBar = () => {
  const branchName = useSelector(getBranchNameSelector);

  return (
    <AppBarContainer>
      <ContentContainer>
        <AppTitle>
          <Heading size={600}>
            <b>ezyGit</b>
          </Heading>
        </AppTitle>

        <CentreContent>
          <Heading size={500}>
            Branch: <b>{branchName}</b>
          </Heading>
        </CentreContent>

        <RightHandSide />
      </ContentContainer>
    </AppBarContainer>
  );
};
