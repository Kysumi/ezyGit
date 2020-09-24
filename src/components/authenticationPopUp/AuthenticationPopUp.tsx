import { Dialog, Heading } from 'evergreen-ui';
import React from 'react';

export const AuthenticationPopUp = () => {
  return (
    <Dialog
      isShown={true}
      shouldCloseOnOverlayClick={false}
      hasClose={false}
      hasHeader={false}
      onConfirm={() => {}}
    >
      <Heading>Credentials</Heading>
    </Dialog>
  );
};
