import React from 'react';
import { Button, Intent } from '@blueprintjs/core';

const { dialog } = window.require('electron').remote;

const OpenPopUp = () => {
  dialog
    .showOpenDialog({
      title: 'Select a folder',
      properties: ['openDirectory'],
    })
    .then(({ filePaths }) => {
      console.log(filePaths);

      // Dispatch redux event here
    });
};

export const FolderPicker = () => {
  return (
    <Button intent={Intent.PRIMARY} onClick={OpenPopUp}>
      Select Git Repo
    </Button>
  );
};
