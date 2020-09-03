import React from 'react';
import { ConfirmationButton } from './ConfirmationButton';
import { Button, Intent } from '@blueprintjs/core';

interface GitButtonProps {
  onClick: () => void;
}

export const DeleteButton = ({ onClick }: GitButtonProps) => {
  return (
    <ConfirmationButton onClick={onClick} intent={'danger'} text={'Delete'} />
  );
};

export const UnstageButton = ({ onClick }: GitButtonProps) => {
  return (
    <Button
      text="Unstage"
      intent={Intent.WARNING}
      onClick={onClick}
      style={{ margin: '5px' }}
    />
  );
};

export const DiscardButton = ({ onClick }: GitButtonProps) => {
  return (
    <Button
      text="Discard"
      intent={Intent.DANGER}
      onClick={onClick}
      style={{ margin: '5px' }}
    />
  );
};

export const StageButton = ({ onClick }: GitButtonProps) => {
  return (
    <Button
      text="Stage"
      intent={Intent.PRIMARY}
      style={{ margin: '5px' }}
      onClick={onClick}
    />
  );
};
