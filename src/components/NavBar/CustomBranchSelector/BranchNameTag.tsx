import React from 'react';
import Icon from '@iconify/react';
import gitBranch from '@iconify/icons-ion/git-branch';
import './style.css';

const BranchNameTag = (props: { branchName: string }) => {
  return (
    <div className={'branchNameTag'}>
      <Icon icon={gitBranch} color="White" />
      {props.branchName}
    </div>
  );
};

export default BranchNameTag;
