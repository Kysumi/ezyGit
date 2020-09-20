import React, { useState } from 'react';
import { Button, IntentTypes } from 'evergreen-ui';

import * as _ from 'lodash';

interface ConfirmationButtonProps {
  onClick: () => void;
  intent: IntentTypes;
  text: string;
  confirmationText?: string;
}

export const ConfirmationButton = ({
  onClick,
  intent,
  text,
  confirmationText = 'Confirm!',
}: ConfirmationButtonProps) => {
  const [pendingConfirmation, setPendingConfirmation] = useState(true);

  const onClickWrapper = () => {
    if (pendingConfirmation) {
      setPendingConfirmation(false);
      _.delay(() => setPendingConfirmation(true), 2000);
    } else {
      onClick();
    }
  };

  return (
    <Button intent={intent} onClick={onClickWrapper} style={{ margin: '5px' }}>
      {pendingConfirmation ? text : confirmationText}
    </Button>
  );
};
