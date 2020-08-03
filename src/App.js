import React, { useState } from 'react';
import { Resizable } from 're-resizable';
import { AppBar } from './components/appbar/AppBar';
import { Box, List, ListItem, ListIcon } from '@chakra-ui/core';
import { FolderPicker } from './components/folderpicker/FolderPicker';

function App() {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <Box style={{ height: '100%' }}>
      <AppBar />
      <Resizable defaultSize={{ width: '30%', height: '100%' }}>
        <List spacing={3}>
          <ListItem>
            <ListIcon icon="check-circle" color="green.500" />
            Lorem ipsum dolor sit amet, consectetur adipisicing elit
          </ListItem>
          <ListItem>
            <ListIcon icon="check-circle" color="green.500" />
            Assumenda, quia temporibus eveniet a libero incidunt suscipit
          </ListItem>
          <ListItem>
            <ListIcon icon="check-circle" color="green.500" />
            Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
          </ListItem>
          <ListItem>
            <ListIcon color="green.500" />
            Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
          </ListItem>
        </List>
      </Resizable>
      <FolderPicker />
    </Box>
  );
}

export default App;
