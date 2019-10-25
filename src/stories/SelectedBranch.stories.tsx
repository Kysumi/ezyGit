import React from 'react';
import BranchNameTagExample from '../components/NavBar/CustomBranchSelector/BranchNameTag';
import CustomBranchSelector from '../components/NavBar/CustomBranchSelector/CustomBranchSelector';

export default {
  title: 'Custom Branch Selector',
};

export const BranchNameTag = () => (
  <BranchNameTagExample branchName={'Example'} />
);

const selected = ['master', 'stable'];

const availble = ['bleeding-edge'];

export const BranchSelector = () => (
  <CustomBranchSelector
    selectedBranches={selected}
    availableBranches={availble}
  />
);
