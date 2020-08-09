import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactList from 'react-list';
import { CommitListItem } from './CommitListItem';
import { getCommitListItems } from '../../store/repo/RepoSelector';
import { selectedCommitSelector } from '../../store/view/ViewSelector';
import { selectHash } from '../../store/view/View';
import { PendingCommitItem } from './PendingCommitItem';

const listStyle = {
  overflow: 'auto',
  maxHeight: 'calc(100vh - 60px)',
  minHeight: 'calc(100vh - 60px)',
};

export const CommitList = () => {
  const commits = useSelector(getCommitListItems);
  const selectedCommit = useSelector(selectedCommitSelector);

  const dispatch = useDispatch();

  const renderItem = (index, key) => {
    const commit = commits[index];
    const onClick = () => {
      dispatch(selectHash(commit.oid));
    };

    if (commit.oid == null) {
      return (
        <PendingCommitItem
          id={key}
          isSelected={selectedCommit === commit.oid}
          onClick={onClick}
        />
      );
    } else {
      return (
        <CommitListItem
          id={key}
          isSelected={selectedCommit === commit.oid}
          commit={commit.commit}
          onClick={onClick}
        />
      );
    }
  };

  if (commits.length !== 1) {
    return (
      <div style={listStyle}>
        <ReactList
          itemRenderer={renderItem}
          length={commits.length}
          type="uniform"
        />
      </div>
    );
  } else {
    return 'No Commits';
  }
};
