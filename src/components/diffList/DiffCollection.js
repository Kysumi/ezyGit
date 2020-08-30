import React from 'react';
import DiffList from './DiffList';
import { CollapseHeader } from './CollapseHeader';

export const DiffCollection = ({ title, diffs, diffType }) => {
  return (
    <CollapseHeader title={title}>
      <div style={{ paddingLeft: '10px', backgroundColor: '#e6eaed' }}>
        <DiffList items={diffs} diffType={diffType} />
      </div>
    </CollapseHeader>
  );
};
