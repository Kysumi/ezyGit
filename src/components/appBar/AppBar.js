import React from 'react';
import { useSelector } from 'react-redux';
import { getBranchNameSelector } from '../../store/repo/RepoSelector';
import { Button, Pane } from 'evergreen-ui';

export const AppBar = () => {
  const branchName = useSelector(getBranchNameSelector);

  return (
    <Pane display="flex" padding={16} background="tint2" borderRadius={3}>
      <h2>ezyGit</h2>
      <div>
        Branch: <b>{branchName}</b>
      </div>
      <Button icon="git-commit" text="Commit" />
    </Pane>
  );
};
