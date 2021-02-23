import React from 'react';
import styled from 'styled-components';
import { CurrentBranch } from './CurrentBranch/CurrentBranch';

const AppBarContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  padding: 1rem;
`;

const Title = styled.h1`
  margin: 0px;
  margin-right: 0.8rem;
`;

const Divider = styled.div`
  width: 3px;
  background-color: gray;
  margin-right: 0.8rem;
`;

export const AppBar = () => {
  return (
    <AppBarContainer>
      <Title>ezyGit</Title>
      <Divider />
      <CurrentBranch />
    </AppBarContainer>
  );
};
