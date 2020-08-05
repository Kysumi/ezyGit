import React from 'react';
import { Navbar } from '@blueprintjs/core';
import { getCommitLog } from '../../git/git';
import { useSelector } from 'react-redux';

const item = (commit) => {
  return <li>{commit.commit.message}</li>;
};

export const SideList = () => {
  const { commits } = useSelector((state) => state.Commit);
  if (commits !== null) {
    return <ul>{commits.map(item)}</ul>;
  } else {
    return 'No Commits';
  }
};
