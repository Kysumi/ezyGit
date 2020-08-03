import React from 'react';
import { Overlay, Classes, Button, Intent } from '@blueprintjs/core';
import { FolderPicker } from '../folderpicker/FolderPicker';

const handleClose = () => {
  console.log('all done');
};

export const SelectRepo = () => {
  return (
    <Overlay
      onClose={handleClose}
      className={Classes.OVERLAY_SCROLL_CONTAINER}
      isOpen={true}
      autoFocus={true}
      canEscapeKeyClose={true}
      canOutsideClickClose={true}
      enforceFocus={true}
      hasBackdrop={true}
      usePortal={true}
      useTallContent={false}
    >
      <div className={Classes.CARD + Classes.ELEVATION_4}>
        Select repo directory
        <FolderPicker />
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Button
            intent={Intent.DANGER}
            onClick={handleClose}
            style={{ margin: '' }}
          >
            Close
          </Button>
        </div>
      </div>
    </Overlay>
  );
};
