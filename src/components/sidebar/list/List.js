import React from 'react';
import { Box } from 'grommet';

export const List = ({ data, selectedId }) => {
  return (
    <Box align="center" pad="large" gap="large">
      <List
        data={data.slice(0, 10)}
        itemProps={
          selectedId >= 0
            ? { [selectedId]: { background: 'brand' } }
            : undefined
        }
        // onClickItem={(event) =>

        // }
      />
    </Box>
  );
};
