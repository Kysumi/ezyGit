import React, { ReactNode, MouseEventHandler } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { COLORS } from '../../styles/style';

interface CommitListItemStyleProps {
  color: string;
  isSelected: boolean;
  children: ReactNode;
  onClick: MouseEventHandler;
}

const StyledDiv = styled.div`
  margin: 5px;
  box-shadow: 10px 20px 32px -5px rgba(194, 190, 194, 1);
  border-left: 10px solid ${(props) => props.theme.color};
  border-radius: 5px;
  background-color: ${(props) =>
    props.theme.selected ? COLORS.TRIM : COLORS.WHITE};
  padding: 20px;
`;

export const CommitListItemStyle = ({
  color,
  isSelected,
  children,
  onClick,
}: CommitListItemStyleProps) => {
  const themeSettings = {
    color: color,
    selected: isSelected,
  };

  return (
    <ThemeProvider theme={themeSettings}>
      <StyledDiv onClick={onClick} color={color}>
        {children}
      </StyledDiv>
    </ThemeProvider>
  );
};
