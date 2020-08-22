import React from 'react';
import { Button } from '@blueprintjs/core';

export const DiscardButton = ({ onClick }) => {
  return (
    <Button
      text="Stage"
      intent="danger"
      onClick={onClick}
      style={{ margin: '5px' }}
    />
  );
};
