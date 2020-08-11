import React from 'react';
import { Resizable } from 're-resizable';
import { CommitList } from '../../components/commitList/CommitList';

export const LeftHandSide = () => {
  return (
    <Resizable defaultSize={{ width: '30%', height: '100%' }}>
      <CommitList />
    </Resizable>
  );
};
