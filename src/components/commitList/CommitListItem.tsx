import React, { MouseEventHandler } from 'react';
import { Classes, Text } from '@blueprintjs/core';
import { useSelector } from 'react-redux';
import { stringToColour } from '../../helper/stringToColor';
import { getBranchNameSelector } from '../../store/repo/RepoSelector';
import { CommitObject } from 'isomorphic-git';
import { CommitListItemStyle } from './CommitListItemStyle';

const classNames = require('classnames');

interface CommitListItemProps {
  isSelected: boolean;
  onClick: MouseEventHandler;
  commit: CommitObject;
}

export const CommitListItem = ({
  isSelected,
  commit,
  onClick,
}: CommitListItemProps) => {
  const color = stringToColour(useSelector(getBranchNameSelector));

  return (
    <CommitListItemStyle
      color={color}
      isSelected={isSelected}
      onClick={onClick}
    >
      <Text className={classNames(Classes.TEXT_MUTED, Classes.TEXT_SMALL)}>
        {commit.committer.name}
      </Text>
      <Text ellipsize={true}>{commit.message}</Text>
    </CommitListItemStyle>
  );
};
