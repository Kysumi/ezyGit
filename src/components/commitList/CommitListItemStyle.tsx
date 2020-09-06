import React, { ReactNode, MouseEventHandler } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { COLORS } from '../../styles/style';
import { StyledCard } from '../../styles/StyledCard';

interface CommitListItemStyleProps {
  color: string;
  isSelected: boolean;
  children: ReactNode;
  onClick: MouseEventHandler;
}

const StyledDiv = styled(StyledCard)`
  margin: 5px;
  border-left: 10px solid ${(props) => props.theme.color};
  background-color: ${(props) =>
    props.theme.selected ? COLORS.TRIM : COLORS.WHITE};
  padding: 20px;
  height: 60px;
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
