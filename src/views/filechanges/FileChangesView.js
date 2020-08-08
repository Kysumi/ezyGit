import React from 'react';
import DiffList from '../../components/difflist/DiffList';

export const FileChangesView = () => {
  return (
    <div>
      <h3>File Changes</h3>

      <div>
        <h5>Working Changes</h5>
        <DiffList />
      </div>

      <div>
        <h5>Untracked Files</h5>
        <DiffList />
      </div>
    </div>
  );
};
