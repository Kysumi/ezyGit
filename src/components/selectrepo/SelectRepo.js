import React from 'react';
import { Overlay, Classes, Button, Intent } from '@blueprintjs/core';
import { useDispatch } from 'react-redux';
import { setFilePath } from '../../store/Repo';
import { setPopUpVisible } from '../../store/View';

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

export const SelectRepo = () => {
  const dispatch = useDispatch();

  return (
    <Overlay className={Classes.OVERLAY} isOpen={true}>
      <div
        className={Classes.CARD + ' ' + Classes.ELEVATION_4}
        style={{ ...style }}
      >
        <div className={Classes.DIALOG_CLOSE_BUTTON}>
          <Button
            icon={'cross'}
            onClick={() => dispatch(setPopUpVisible(false))}
          ></Button>
        </div>

        <div className={Classes.DIALOG_BODY}>
          <h3>Select repo directory</h3>
          <Button intent={Intent.PRIMARY} onClick={() => OpenPopUp(dispatch)}>
            Select Git Repo
          </Button>
        </div>

        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Button intent={Intent.SUCCESS} onClick={() => {}}>
            Confirm
          </Button>
        </div>
      </div>
    </Overlay>
  );
};
