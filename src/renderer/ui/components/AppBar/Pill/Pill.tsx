import React from 'react';
import styled from 'styled-components';
import { stringToColour } from '../../../../helpers/stringToColor';

const PillContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 5px;
  background-color: ${stringToColour('default')};
`;

export const Pill = ({ children }) => {
  return <PillContainer>{children}</PillContainer>;
};
