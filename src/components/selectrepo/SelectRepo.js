import React from 'react';
import { Overlay, Classes, Button, Intent } from '@blueprintjs/core';
import { FolderPicker } from '../folderpicker/FolderPicker';

const handleClose = () => {
  console.log('all done');
};

const style = {
  left: 'calc(50vw - 200px)',
  margin: '10vh 0',
  top: 0,
  width: '400px',
};

export const SelectRepo = () => {
  return (
    <Overlay className={Classes.OVERLAY_SCROLL_CONTAINER} isOpen={true}>
      <div
        className={Classes.CARD + ' ' + Classes.ELEVATION_4}
        style={{ backgroundColor: 'white', ...style }}
      >
        <h3>Select repo directory</h3>

        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <FolderPicker />
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
