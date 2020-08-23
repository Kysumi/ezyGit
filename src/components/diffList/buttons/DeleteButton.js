import React from 'react';
import { Button } from '@blueprintjs/core';

export const DeleteButton = ({ onClick }) => {
  return (
    <Button
      text="Delete"
      intent="danger"
      onClick={onClick}
      style={{ margin: '5px' }}
    />
  );
};
