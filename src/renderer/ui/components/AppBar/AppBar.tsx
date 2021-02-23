import React from 'react';
import styled from 'styled-components';
import { stringToColour } from '../../../helpers/stringToColor';

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  padding: 30px;
`;

const Title = styled.h1`
  margin: 0px;
  padding-right: 30px;
`;

const Divider = styled.div`
  width: 5px;
  background-color: gray;
  margin-right: 30px;
`;

const Branch = styled.div`
  font-weight: 500;
  padding: 10px;
`;

const Pill = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 5px;
  background-color: ${stringToColour('default')};
`;

const BranchPill = () => {
  return (
    <Pill>
      <Branch>default</Branch>
    </Pill>
  );
};

export const AppBar = () => {
  return (
    <Container>
      <Title>ezyGit</Title>
      <Divider />
      <BranchPill />
    </Container>
  );
};
