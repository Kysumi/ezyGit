import React from 'react';
import { Button } from '@blueprintjs/core';

export const DiscardButton = ({ onClick }) => {
  return (
    <Button
      text="Discard"
      intent="danger"
      onClick={onClick}
      style={{ margin: '5px' }}
    />
  );
};
