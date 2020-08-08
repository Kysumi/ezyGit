import React from 'react';
import { Classes, Text } from '@blueprintjs/core';
import { useSelector } from 'react-redux';
import { stringToColour } from '../../helper/stringToColor';
import { getBranchNameSelector } from '../../store/repo/RepoSelector';
const classNames = require('classnames');

export const SideListItem = ({ id, isSelected, commit, onClick }) => {
  const color = stringToColour(useSelector(getBranchNameSelector));

  const style = {
    margin: '5px',
    boxShadow: '10px 20px 32px -5px rgba(194,190,194,1)',
    borderLeft: '10px solid ' + color,
    borderRadius: '5px',
    backgroundColor: isSelected ? '#e6eaed' : '#ffffff',
  };

  return (
    <div key={id} className={Classes.CARD} style={style} onClick={onClick}>
      <Text className={classNames(Classes.TEXT_MUTED, Classes.TEXT_SMALL)}>
        {commit.committer.name}
      </Text>
      <Text ellipsize={true}>{commit.message}</Text>
    </div>
  );
};
