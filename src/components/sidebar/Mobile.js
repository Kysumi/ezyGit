import React from 'react';
import { Box, Layer, Button } from 'grommet';
import { FormClose } from 'grommet-icons';

export const Mobile = ({ setShowSidebar }) => {
  return (
    <Layer>
      <Box
        background="light-2"
        tag="header"
        justify="end"
        align="center"
        direction="row"
      >
        <Button icon={<FormClose />} onClick={() => setShowSidebar(false)} />
      </Box>
      <Box fill background="light-2" align="center" justify="center">
        sidebar
      </Box>
    </Layer>
  );
};
