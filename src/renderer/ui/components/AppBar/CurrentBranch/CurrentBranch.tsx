import React from 'react';
import styled from 'styled-components';
import { Pill } from '../Pill/Pill';


// code-branch

const Branch = styled.div`
  font-weight: 400;
  padding: 10px;
`;

const BranchContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  text-align: center;
`;

export const CurrentBranch = () => {
  return (
    <BranchContainer>
      <Pill>
        <Branch>default</Branch>
      </Pill>
    </BranchContainer>
  );
};
