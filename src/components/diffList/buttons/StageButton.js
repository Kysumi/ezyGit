import React from 'react';
import { Button, Intent } from '@blueprintjs/core';

export const StageButton = ({ onClick }) => {
  return (
    <Button
      text="Stage"
      intent={Intent.PRIMARY}
      style={{ margin: '5px' }}
      onClick={onClick}
    />
  );
};
