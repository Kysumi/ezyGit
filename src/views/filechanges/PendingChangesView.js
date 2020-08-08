import React from 'react';
import DiffList from '../../components/difflist/DiffList';

export const PendingChangesView = () => {
  return (
    <div>
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
