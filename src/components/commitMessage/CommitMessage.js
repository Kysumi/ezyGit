import React, { useRef, useState } from 'react';
import { omniBarIsOpenSelector } from '../../store/view/ViewSelector';
import { connect, useDispatch } from 'react-redux';
import {
  Pane,
  TextareaField,
  Button,
  GitCommitIcon,
  toaster,
} from 'evergreen-ui';
import { getStagedFilesCount } from '../../store/repo/RepoSelector';
import { HotKeys } from 'react-hotkeys';
import { commitThunk } from '../../store/repo/gitThunks';

//TODO move out
const useFocus = () => {
  const htmlElRef = useRef(null);
  const setFocus = () => {
    htmlElRef.current && htmlElRef.current.focus();
  };

  return [htmlElRef, setFocus];
};

const keyMap = {
  COMMIT: 'ctrl+enter',
};

export const CommitMessage = ({
  message,
  disabled,
  omniBarIsOpen,
  hasStagedFiles,
}) => {
  const [inputRef, setFocus] = useFocus();
  const [stateMessage, updateMessage] = useState(message);
  const dispatch = useDispatch();

  if (omniBarIsOpen === false) {
    setFocus();
  }

  const handleCommit = () => {
    if (!hasStagedFiles) {
      toaster.warning(
        'There is currently no files to commit. Please stage some files'
      );
      return;
    }

    dispatch(commitThunk(stateMessage));
  };

  const handlers = {
    COMMIT: handleCommit,
  };

  return (
    <Pane>
      <Button iconBefore={GitCommitIcon} onClick={handleCommit}>
        {hasStagedFiles ? 'Commit' : 'No Files To Commit'}
      </Button>
      <HotKeys keyMap={keyMap} handlers={handlers}>
        <TextareaField
          // ref={inputRef}
          label="Commit Message"
          placeholder="Commit message goes in here..."
          spellCheck={true}
          disabled={disabled}
          value={stateMessage}
          onChange={(e) => updateMessage(e.target.value)}
          style={{ resize: 'none' }}
        />
      </HotKeys>
    </Pane>
  );
};

const mapStateToProps = (state) => {
  return {
    omniBarIsOpen: omniBarIsOpenSelector(state),
    hasStagedFiles: getStagedFilesCount(state) > 0,
  };
};

export default connect(mapStateToProps)(CommitMessage);
