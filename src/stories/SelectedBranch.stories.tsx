import React from 'react';
import BranchNameTagExample from '../components/NavBar/CustomBranchSelector/BranchNameTag';
import { CustomBranchSelector } from '../components/NavBar/CustomBranchSelector/CustomBranchSelector';

export default {
  title: 'Custom Branch Selector',
};

export const BranchNameTag = () => (
  <BranchNameTagExample branchName={'Example'} />
);

const selected = [
  { name: 'master', oid: '12312' },
  { name: 'stable', oid: '12312' },
];

const availble = [{ name: 'bleeding-edge', oid: '12312' }];

export const BranchSelector = () => (
  <CustomBranchSelector
    selectedBranches={selected}
    availableBranches={availble}
  />
);
