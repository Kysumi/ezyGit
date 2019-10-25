import React from 'react';
import { Icon } from '@iconify/react';
import BranchNameTag from './BranchNameTag';
import addCircle from '@iconify/icons-ion/add-circle';
import './style.css';
import { Button } from '@blueprintjs/core';

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
  return (
    <div className="branchSelector">
      {branches}
      <Button minimal={true}>
        <Icon icon={addCircle} width={20} style={{ verticalAlign: 'middle' }} />
      </Button>
    </div>
  );
};

export default CustomBranchSelector;
