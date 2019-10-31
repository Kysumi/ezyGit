import * as React from 'react';
import {
  Alignment,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
  Button,
} from '@blueprintjs/core';
import { IBranch } from './CustomBranchSelector/BranchSelector';

interface INavBarProps {
  branch: string;
  fecthGitCommit: any;
}

const NavBar: React.FunctionComponent<INavBarProps> = props => {
  const { branch } = props;

  return (
    <Navbar fixedToTop={true}>
      <NavbarGroup align={Alignment.LEFT} style={{ width: '70%' }}>
        <NavbarHeading>ezyGit</NavbarHeading>
        <NavbarDivider />
        <BranchSelector />
      </NavbarGroup>
      <NavbarGroup align={Alignment.RIGHT}>
        <Button>Settings</Button>
        <Button>Commit</Button>
      </NavbarGroup>
    </Navbar>
  );
};

export default NavBar;
