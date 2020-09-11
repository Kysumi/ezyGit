import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactList from 'react-list';
import { CommitListItem } from './CommitListItem';
import { getCommitListItems } from '../../store/repo/RepoSelector';
import { getSelectdCommitHashSelector } from '../../store/view/ViewSelector';
import { handleSelectingCommit } from '../../store/view/View';
import PendingCommitItem from './PendingCommitItem';
import styled from 'styled-components';

const StyledDiv = styled.div`
  box-sizing: border-box;
  padding-right: 1rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  overflow: auto;
  max-height: calc(100vh - 70px);
  min-height: calc(100vh - 70px);
`;

export const CommitList = () => {
  const dispatch = useDispatch();
  const commits = useSelector(getCommitListItems);
  const selectedHash = useSelector(getSelectdCommitHashSelector);

  const renderItem = (index: number, key: number | string) => {
    const commit = commits[index];

    const onClick = () => {
      dispatch(handleSelectingCommit(commit));
    };

    if (commit.oid == null) {
      return (
        <PendingCommitItem
          key={key}
          isSelected={selectedHash === commit.oid}
          onClick={onClick}
        />
      );
    } else {
      return (
        <CommitListItem
          key={key}
          isSelected={selectedHash === commit.oid}
          commit={commit.commit}
          onClick={onClick}
        />
      );
    }
  };

  if (commits.length !== 1) {
    return (
      <StyledDiv>
        <ReactList
          itemRenderer={renderItem}
          length={commits.length}
          type="uniform"
        />
      </StyledDiv>
    );
  } else {
    return <StyledDiv>'No Commits'</StyledDiv>;
  }
};
