import React from 'react';
import { Button, Intent } from '@blueprintjs/core';

export const UnstageButton = ({ onClick }) => {
  return (
    <Button
      text="Unstage"
      intent={Intent.WARNING}
      onClick={onClick}
      style={{ margin: '5px' }}
    />
  );
};
