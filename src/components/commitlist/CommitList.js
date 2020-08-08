import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactList from 'react-list';
import { CommitListItem } from './CommitListItem';
import { getCommitsSelector } from '../../store/repo/RepoSelector';
import { selectedCommitSelector } from '../../store/view/ViewSelector';
import { selectHash } from '../../store/view/View';

const listStyle = {
  overflow: 'auto',
  maxHeight: 'calc(100vh - 60px)',
  minHeight: 'calc(100vh - 60px)',
};

export const CommitList = () => {
  const commits = useSelector(getCommitsSelector);
  const selectedCommit = useSelector(selectedCommitSelector);

  const dispatch = useDispatch();

  const renderItem = (index, key) => {
    const commit = commits[index];
    const onClick = () => {
      dispatch(selectHash(commit.oid));
    };
    return (
      <CommitListItem
        key={key}
        isSelected={selectedCommit === commit.oid}
        commit={commit.commit}
        onClick={onClick}
      />
    );
  };

  if (commits !== null) {
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
