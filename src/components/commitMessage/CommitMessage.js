import React, { useRef, useState } from 'react';
import { omniBarIsOpenSelector } from '../../store/view/ViewSelector';
import { connect } from 'react-redux';
import {
  Pane,
  TextareaField,
  Button,
  GitCommitIcon,
  toaster,
} from 'evergreen-ui';
import { commitChanges } from '../../git/git';
import { getStagedFilesCount } from '../../store/repo/RepoSelector';
import { HotKeys } from 'react-hotkeys';

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
  const [stateMessgage, updateMessage] = useState(message);

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

    commitChanges();
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
          value={stateMessgage}
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
