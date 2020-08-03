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

export const AppBar = () => {
  return (
    <Navbar>
      <NavbarGroup>
        <NavbarHeading>ezyGit</NavbarHeading>
        <NavbarDivider />
        Branch:
      </NavbarGroup>
      <NavbarGroup align={Alignment.RIGHT}>
        <NavbarDivider />
        <Button className={Classes.MINIMAL} icon="git-commit" text="Commit" />
      </NavbarGroup>
    </Navbar>
  );
};
