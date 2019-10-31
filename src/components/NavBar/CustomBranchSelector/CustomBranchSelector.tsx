import './style.css';
import React, { useState } from 'react';
import BranchNameTag from './BranchNameTag';
import BranchSelector, { IBranch } from './BranchSelector';
import OpenCloseButton from './OpenCloseButton';

const BranchTagRenderer = (props: { branches: IBranch[] }) => {
  const result = props.branches.map(branch => {
    return <BranchNameTag branchName={branch.name} />;
  });

  return <>{result}</>;
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
          <OpenCloseButton func={setOpen} open={isOpen} />
        </div>
      ) : (
        <OpenCloseButton func={setOpen} open={isOpen} />
      )}
    </div>
  );
};

export default CustomBranchSelector;
