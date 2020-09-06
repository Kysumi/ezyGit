import React, { MouseEventHandler } from 'react';
import { useSelector } from 'react-redux';
import { stringToColour } from '../../helper/stringToColor';
import { getBranchNameSelector } from '../../store/repo/RepoSelector';
import { CommitObject } from 'isomorphic-git';
import { CommitListItemStyle } from './CommitListItemStyle';
import { Text, Paragraph } from 'evergreen-ui';
import styled from 'styled-components';

interface CommitListItemProps {
  isSelected: boolean;
  onClick: MouseEventHandler;
  commit: CommitObject;
}

export const StyledTextField = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
`;

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
      <Text color="muted">{commit.committer.name}</Text>

      <StyledTextField>
        <Paragraph>{commit.message} </Paragraph>
      </StyledTextField>
    </CommitListItemStyle>
  );
};
