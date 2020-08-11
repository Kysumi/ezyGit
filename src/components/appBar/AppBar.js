import React from 'react';
import {
  Navbar,
  NavbarGroup,
  Button,
  Alignment,
  NavbarHeading,
  NavbarDivider,
  Classes,
} from '@blueprintjs/core';
import { useSelector } from 'react-redux';
import { getBranchNameSelector } from '../../store/repo/RepoSelector';

export const AppBar = () => {
  const branchName = useSelector(getBranchNameSelector);

  return (
    <Navbar>
      <NavbarGroup>
        <NavbarHeading>
          <h2>ezyGit</h2>
        </NavbarHeading>
        <NavbarDivider />
        <div className={Classes.TEXT_LARGE}>
          Branch: <b>{branchName}</b>
        </div>
      </NavbarGroup>
      <NavbarGroup align={Alignment.RIGHT}>
        <NavbarDivider />
        <Button className={Classes.MINIMAL} icon="git-commit" text="Commit" />
      </NavbarGroup>
    </Navbar>
  );
};
