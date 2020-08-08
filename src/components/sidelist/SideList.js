import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactList from 'react-list';
import { SideListItem } from './SideListItem';
import { getCommitsSelector } from '../../store/repo/RepoSelector';
import { selectedCommitSelector } from '../../store/view/ViewSelector';
import { selectHash } from '../../store/view/View';

export const SideList = () => {
  const commits = useSelector(getCommitsSelector);
  const selectedCommit = useSelector(selectedCommitSelector);

  const dispatch = useDispatch();

  const renderItem = (index, key) => {
    const commit = commits[index];
    const onClick = () => {
      dispatch(selectHash(commit.oid));
    };
    console.log(selectedCommit, commit.oid, commit);
    return (
      <SideListItem
        key={key}
        isSelected={selectedCommit === commit.oid}
        commit={commit.commit}
        onClick={onClick}
      />
    );
  };

  if (commits !== null) {
    return (
      <div
        style={{
          overflow: 'auto',
          maxHeight: 'calc(100vh - 60px)',
          minHeight: 'calc(100vh - 60px)',
        }}
      >
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
