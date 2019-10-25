import React from 'react';
import BranchNameTag from './BranchNameTag';
import './style.css';

const BranchTagRenderer = (branches: string[]) => {
  return branches.map(branch => {
    return <BranchNameTag branchName={branch} />;
  });
};

export const CustomBranchSelector = (props: {
  selectedBranches: string[];
  availableBranches: string[];
}) => {
  const branches = BranchTagRenderer(props.selectedBranches);
  return <div className="branchSelector">{branches}</div>;
};

export default CustomBranchSelector;
