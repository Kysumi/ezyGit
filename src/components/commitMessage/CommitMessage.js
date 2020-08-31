import React from 'react';
import { TextArea } from '@blueprintjs/core';
export const CommitMessage = ({ message, disabled }) => {
  return (
    <div>
      <TextArea
        fill={true}
        value={message}
        placeholder={'Commit Message'}
        disabled={disabled}
        autoFocus={true}
      />
    </div>
  );
};
