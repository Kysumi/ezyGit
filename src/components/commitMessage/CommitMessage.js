import React from 'react';
import { TextArea } from '@blueprintjs/core';
export const CommitMessage = ({ message, onChange }) => {
  return (
    <div>
      <TextArea
        fill={true}
        onChange={onChange}
        value={message}
        placeholder={'Commit Message'}
      />
    </div>
  );
};
