import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import BranchNameTag from './BranchNameTag';
import addCircle from '@iconify/icons-ion/add-circle';
import './style.css';
import { Button } from '@blueprintjs/core';
import BranchSelector, { IBranch } from './BranchSelector';

const BranchTagRenderer = (props: { branches: IBranch[] }) => {
  const result = props.branches.map(branch => {
    return <BranchNameTag branchName={branch.name} />;
  });

  return <>{result}</>;
};

const NewButton = (props: {
  func: (props: boolean) => void;
  open: boolean;
}) => {
  return (
    <Button
      minimal={true}
      onClick={() => {
        props.func(!props.open);
      }}
    >
      <Icon icon={addCircle} width={20} style={{ verticalAlign: 'middle' }} />
    </Button>
  );
};

export const CustomBranchSelector = (props: {
  selectedBranches: IBranch[];
  availableBranches: IBranch[];
}) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="branchSelector">
      <BranchTagRenderer branches={props.selectedBranches} />
      {isOpen ? (
        <div className="branchSelector">
          <BranchSelector branches={props.availableBranches} />
          <NewButton func={setOpen} open={isOpen} />
        </div>
      ) : (
        <NewButton func={setOpen} open={isOpen} />
      )}
    </div>
  );
};

export default CustomBranchSelector;
