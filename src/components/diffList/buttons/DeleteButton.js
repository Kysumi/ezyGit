import React from 'react';
import { ConfirmationButton } from './ConfirmationButton';

export const DeleteButton = ({ onClick }) => {
  return (
    <ConfirmationButton onClick={onClick} intent={'danger'} text={'Delete'} />
  );
};
