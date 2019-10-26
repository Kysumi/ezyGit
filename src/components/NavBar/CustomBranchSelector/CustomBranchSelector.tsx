import React, { useState } from 'react';
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

const NewButton = (func: any, isOpen: boolean) => {
  return (
    <Button
      minimal={true}
      onClick={() => {
        func(!isOpen);
      }}
    >
      <Icon icon={addCircle} width={20} style={{ verticalAlign: 'middle' }} />
    </Button>
  );
};

export const CustomBranchSelector = (props: {
  selectedBranches: string[];
  availableBranches: string[];
}) => {
  const [isOpen, setOpen] = useState(false);
  const branches = BranchTagRenderer(props.selectedBranches);

  return (
    <div className="branchSelector">
      {branches}
      {isOpen ? 'Open' : NewButton(setOpen, isOpen)}
    </div>
  );
};

export default CustomBranchSelector;
