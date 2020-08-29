import React, { useState } from 'react';
import { Button } from '@blueprintjs/core';

const _ = require('lodash');

export const ConfirmationButton = ({
  onClick,
  intent,
  text,
  confirmationText = 'Confirm!',
}) => {
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
    <Button
      text={pendingConfirmation ? text : confirmationText}
      intent={intent}
      onClick={onClickWrapper}
      style={{ margin: '5px' }}
    />
  );
};
