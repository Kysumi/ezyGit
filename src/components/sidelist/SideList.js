import React from 'react';
import { useSelector } from 'react-redux';
import ReactList from 'react-list';
import { SideListItem } from './SideListItem';
import { getCommitsSelector } from '../../store/repo/RepoSelector';

export const SideList = () => {
  const commits = useSelector(getCommitsSelector);
  console.log(commits);

  const renderItem = (index, key) => {
    return <SideListItem key={key} commit={commits[index].commit} />;
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
