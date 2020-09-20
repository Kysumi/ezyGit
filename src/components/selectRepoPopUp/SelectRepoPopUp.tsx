import React, { ChangeEvent, useRef, useState } from 'react';
import { toaster, Dialog, Heading } from 'evergreen-ui';
import { connect } from 'react-redux';
import { setFilePath, initialise } from '../../store/repo/Repo';
import FileInput from './FileInput';

interface SelectRepoPopUpProps {
  setReduxFilePath: (filePath: string) => Promise<void>;
  initialise: () => Promise<void>;
}

// const handleOpenPopUp = (callBack: (filePath: string) => void) => {
//   dialog
//     .showOpenDialog({
//       title: 'Select a folder',
//       properties: ['openDirectory'],
//     })
//     .then(({ filePaths }: any) => {
//       callBack(filePaths[0]);
//     });
// };

const onChangeFile = (
  event: ChangeEvent<HTMLInputElement>,
  setFilePathState: (filePath: string) => void
) => {
  event.stopPropagation();
  event.preventDefault();

  const files = event.target.files;

  if (files) {
    console.log(files);

    // setFilePathState(files[0]);
  }
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
  const fileInputRef = useRef(null);

  const callback = (event: ChangeEvent<HTMLInputElement>) => {
    onChangeFile(event, setFilePath);
  };

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
      <FileInput onSelection={callback} />

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
