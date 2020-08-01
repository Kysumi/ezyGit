import React from 'react';
import { Box, Collapsible } from 'grommet';

export const Desktop = ({ showSidebar }) => {
  return (
    <Collapsible direction="horizontal" open={showSidebar}>
      <Box
        flex
        width="medium"
        background="light-2"
        elevation="small"
        align="center"
        justify="center"
      >
        sidebar
      </Box>
    </Collapsible>
  );
};
