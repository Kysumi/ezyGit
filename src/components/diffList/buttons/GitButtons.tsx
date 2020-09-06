import React from 'react';
import { ConfirmationButton } from './ConfirmationButton';
import { Button, Intent } from '@blueprintjs/core';

interface GitButtonProps {
  onClick: () => void;
}

/**
 * Wrapper function to stop the onClick event propogating down to CollapseHeader
 *
 * @param callback The onlick function to call
 */
const handleButtonClick = (callback: () => void) => (
  event: React.MouseEvent<HTMLElement>
) => {
  callback();
  event.stopPropagation();
};

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
      onClick={handleButtonClick(onClick)}
      style={{ margin: '5px' }}
    />
  );
};

export const DiscardButton = ({ onClick }: GitButtonProps) => {
  return (
    <Button
      text="Discard"
      intent={Intent.DANGER}
      onClick={handleButtonClick(onClick)}
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
      onClick={handleButtonClick(onClick)}
    />
  );
};
