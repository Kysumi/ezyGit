import React, { useState } from 'react';
import { Button, toaster, Dialog } from 'evergreen-ui';
import { connect } from 'react-redux';
import { setFilePath, initialise } from '../../store/repo/Repo';
import styled from 'styled-components';
import { COLORS } from '../../styles/style';

const { dialog } = window.require('electron').remote;

const StyledDiv = styled.div`
  left: calc(50vw - 200px);
  margin: 10vh 0;
  top: 0;
  width: 400px;
  background-color: ${COLORS.WHITE};
`;

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
    toaster.danger('You must select a directory');
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
    <Dialog isShown={true}>
      <StyledDiv>
        <div>
          <h3>Select repo directory</h3>
          <Button intent={'none'} onClick={() => handleOpenPopUp(setFilePath)}>
            Select Git Repo
          </Button>
          <h5>Current Path: {filePath}</h5>
        </div>

        <div>
          <Button
            intent={'success'}
            onClick={() => {
              handleClosePopup(filePath, () => {
                setReduxFilePath(filePath);
                initialise();
              });
            }}
          >
            Confirm
          </Button>
        </div>
      </StyledDiv>
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
