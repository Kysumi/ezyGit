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
        <CustomBranchSelector />>
      </NavbarGroup>
      <NavbarGroup align={Alignment.RIGHT}>
        <Button>Settings</Button>
        <Button>Commit</Button>
      </NavbarGroup>
    </Navbar>
  );
};

export default NavBar;
