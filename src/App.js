import React, { useState } from 'react';
import { Box, Grommet, ResponsiveContext } from 'grommet';
import { AppBar } from './components/appbar/AppBar';
import { SideBar } from './components/sidebar/SideBar';

const theme = {
  global: {
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px',
    },
    colors: {
      brand: '#228BE6',
    },
  },
};

function App() {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <Grommet theme={theme}>
      <ResponsiveContext.Consumer>
        {(size) => (
          <Box fill>
            <AppBar setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
            <SideBar
              showSidebar={showSidebar}
              size={size}
              setShowSidebar={setShowSidebar}
            />
            <Box direction="row" flex overflow={{ horizontal: 'hidden' }}>
              <Box flex align="center" justify="center">
                app body
              </Box>
            </Box>
          </Box>
        )}
      </ResponsiveContext.Consumer>
    </Grommet>
  );
}

export default App;
