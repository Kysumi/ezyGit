import React, { useState } from 'react';
import { Button, toaster, Dialog, Heading } from 'evergreen-ui';
import { connect } from 'react-redux';
import { setFilePath, initialise } from '../../store/repo/Repo';

const { dialog } = window.require('electron').remote;

interface SelectRepoPopUpProps {
  setReduxFilePath: (filePath: string) => Promise<void>;
  initialise: () => Promise<void>;
}

const handleOpenPopUp = (callBack: (filePath: string) => void) => {
  dialog
    .showOpenDialog({
      title: 'Select a folder',
      properties: ['openDirectory'],
    })
    .then(({ filePaths }: any) => {
      callBack(filePaths[0]);
    });
};

const handleClosePopup = (filePath: string, success: () => void) => {
  if (filePath === '') {
    toaster.danger('You must select git directory');
  } else {
    success();
  }
};

const SelectRepoPopUp = ({
  setReduxFilePath,
  initialise,
}: SelectRepoPopUpProps) => {
  const [filePath, setFilePath] = useState('');

  return (
    <Dialog
      isShown={true}
      shouldCloseOnOverlayClick={false}
      hasCancel={false}
      hasClose={false}
      hasHeader={false}
      onConfirm={() => {
        handleClosePopup(filePath, () => {
          setReduxFilePath(filePath);
          initialise();
        });
      }}
    >
      <Button intent={'success'} onClick={() => handleOpenPopUp(setFilePath)}>
        Select Git Repo
      </Button>

      <Heading>Current Path: {filePath}</Heading>
    </Dialog>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setReduxFilePath: (filePath: string) => dispatch(setFilePath(filePath)),
    initialise: () => dispatch(initialise()),
  };
};

export default connect(null, mapDispatchToProps)(SelectRepoPopUp);
