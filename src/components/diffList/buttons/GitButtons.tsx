import React from 'react';
import { ConfirmationButton } from './ConfirmationButton';
import { Button } from 'evergreen-ui';

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
      intent="warning"
      onClick={handleButtonClick(onClick)}
      style={{ margin: '5px' }}
    >
      Unstage
    </Button>
  );
};

export const DiscardButton = ({ onClick }: GitButtonProps) => {
  return (
    <Button
      intent="danger"
      onClick={handleButtonClick(onClick)}
      style={{ margin: '5px' }}
    >
      Discard
    </Button>
  );
};

export const StageButton = ({ onClick }: GitButtonProps) => {
  return (
    <Button
      intent="none"
      style={{ margin: '5px' }}
      onClick={handleButtonClick(onClick)}
    >
      Stage
    </Button>
  );
};
