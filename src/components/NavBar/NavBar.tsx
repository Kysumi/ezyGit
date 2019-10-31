import * as React from 'react';
import {
  Alignment,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
  Button,
} from '@blueprintjs/core';
import CustomBranchSelector from './CustomBranchSelector/CustomBranchSelector';
import BranchNameTag from './CustomBranchSelector/BranchNameTag';

const NavBar: React.FunctionComponent<{ branchName: string }> = props => {
  const { branchName } = props;

  return (
    <Navbar fixedToTop={true}>
      <NavbarGroup align={Alignment.LEFT} style={{ width: '70%' }}>
        <NavbarHeading>ezyGit</NavbarHeading>
        <NavbarDivider />
        Current Branch <BranchNameTag branchName={branchName} />
        <NavbarDivider />
        <CustomBranchSelector />
      </NavbarGroup>
      <NavbarGroup align={Alignment.RIGHT}>
        <Button>Settings</Button>
        <Button>Commit</Button>
      </NavbarGroup>
    </Navbar>
  );
};

export default NavBar;
