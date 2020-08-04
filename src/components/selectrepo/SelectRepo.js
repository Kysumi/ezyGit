import React from 'react';
import { Overlay, Classes, Button, Intent } from '@blueprintjs/core';
import { useDispatch } from 'react-redux';
import { setGitRepo, setFilePath } from '../../store/Repo';

const { dialog } = window.require('electron').remote;

const style = {
  left: 'calc(50vw - 200px)',
  margin: '10vh 0',
  top: 0,
  width: '400px',
  backgroundColor: 'white',
};

const OpenPopUp = (dispatch) => {
  dialog
    .showOpenDialog({
      title: 'Select a folder',
      properties: ['openDirectory'],
    })
    .then(({ filePaths }) => {
      console.log(filePaths);

      dispatch(setFilePath(filePaths[0]));

      // Dispatch redux event here
    });
};

const handleClose = () => {
  console.log('all done');
};

export const SelectRepo = () => {
  const dispatch = useDispatch();

  return (
    <Overlay className={Classes.OVERLAY_SCROLL_CONTAINER} isOpen={true}>
      <div
        className={Classes.CARD + ' ' + Classes.ELEVATION_4}
        style={{ ...style }}
      >
        <h3>Select repo directory</h3>

        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Button intent={Intent.PRIMARY} onClick={() => OpenPopUp(dispatch)}>
            Select Git Repo
          </Button>
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
