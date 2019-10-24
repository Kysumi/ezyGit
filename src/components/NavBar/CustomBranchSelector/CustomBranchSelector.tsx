import React from 'react';
import BranchNameTag from './BranchNameTag';

export const CustomBranchSelector = (props: {
  selectedBranches: string[];
  availableBranches: string[];
}) => {
  return (
    <div>
      <BranchNameTag branchName={'One1'} />
      <BranchNameTag branchName={'Two2'} />
    </div>
  );
};

export default CustomBranchSelector;
