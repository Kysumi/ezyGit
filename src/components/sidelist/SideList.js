import React from 'react';
import { Navbar } from '@blueprintjs/core';
import { getCommitLog } from '../../git/git';
import { useSelector } from 'react-redux';

export const SideList = () => {
  const { filePath } = useSelector((state) => state.Repo);

  if (filePath !== '') {
    getCommitLog(filePath)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.error(err));
  }

  return (
    <ul>
      <li>Example</li>
      <li>Testaroo</li>
    </ul>
  );
};
