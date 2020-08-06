import React from 'react';
import { Classes, Text } from '@blueprintjs/core';

export const SideListItem = ({ id, commit }) => {
  return (
    <div key={id} className={Classes.CARD}>
      <Text ellipsize={true}>{commit.message}</Text>
    </div>
  );
};
