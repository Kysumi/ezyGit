import React from 'react';
import { Heading, Button } from 'grommet';
import { Notification } from 'grommet-icons';
import { NavBar } from './NavBar';

export const AppBar = ({ setShowSidebar, showSidebar }) => {
  return (
    <NavBar>
      <Heading level="3" margin="none">
        ezyGit
      </Heading>
      <Button
        icon={<Notification />}
        onClick={() => setShowSidebar(!showSidebar)}
      />
    </NavBar>
  );
};
