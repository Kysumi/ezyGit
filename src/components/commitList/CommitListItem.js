import React from 'react';
import { Classes, Text } from '@blueprintjs/core';
import { useSelector } from 'react-redux';
import { stringToColour } from '../../helper/stringToColor';
import { getBranchNameSelector } from '../../store/repo/RepoSelector';
import styled, { ThemeProvider } from 'styled-components';

const classNames = require('classnames');

const Thingy = styled.div`
  margin: 5px;
  box-shadow: 10px 20px 32px -5px rgba(194, 190, 194, 1);
  border-left: 10px solid ${(props) => props.theme.color};
  border-radius: 5px;
  background-color: ${(props) =>
    props.theme.selected ? '#e6eaed' : '#ffffff'};
  padding: 20px;
`;

export const CommitListItem = ({ isSelected, commit, onClick }) => {
  const color = stringToColour(useSelector(getBranchNameSelector));

  const themeSettings = {
    color: color,
    selected: isSelected,
  };

  return (
    <ThemeProvider theme={themeSettings}>
      <Thingy onClick={onClick} color={color}>
        <Text className={classNames(Classes.TEXT_MUTED, Classes.TEXT_SMALL)}>
          {commit.committer.name}
        </Text>
        <Text ellipsize={true}>{commit.message}</Text>
      </Thingy>
    </ThemeProvider>
  );
};
