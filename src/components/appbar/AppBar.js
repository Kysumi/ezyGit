import React from 'react';
import { Heading, Button } from 'grommet';
import { CaretPrevious, CaretNext } from 'grommet-icons';
import { NavBar } from './NavBar';

export const AppBar = ({ setShowSidebar, showSidebar }) => {
  return (
    <NavBar>
      <Heading level="3" margin="none">
        ezyGit
      </Heading>
      <Button
        icon={showSidebar ? <CaretPrevious /> : <CaretNext />}
        onClick={() => setShowSidebar(!showSidebar)}
      />
    </NavBar>
  );
};
