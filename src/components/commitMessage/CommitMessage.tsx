import React, { Component, ChangeEvent } from 'react';
import {
  omniBarIsOpenSelector,
  hasSelectedCommitSelector,
} from '../../store/view/ViewSelector';
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
// const useFocus = () => {
//   const htmlElRef = useRef(null);
//   const setFocus = () => {
//     htmlElRef.current && htmlElRef.current.focus();
//   };

//   return [htmlElRef, setFocus];
// };

const keyMap = {
  COMMIT: 'ctrl+enter',
};

interface CommitMessageProps {
  message: string;
  omniBarIsOpen: boolean;
  hasStagedFiles: boolean;
  disabled: boolean;
  selectedCommit: boolean;
  dispatchCommitChanges: (message: string) => void;
}

interface CommitMessageState {
  currentMessage: string;
}

export class CommitMessage extends Component<
  CommitMessageProps,
  CommitMessageState
> {
  state: CommitMessageState = {
    currentMessage: '',
  };

  handleCommit = () => {
    const { currentMessage } = this.state;
    const { hasStagedFiles, dispatchCommitChanges } = this.props;

    if (!hasStagedFiles) {
      toaster.warning(
        'There is currently no files to commit. Please stage some files'
      );
      return;
    }

    this.setState({ currentMessage: '' });

    dispatchCommitChanges(currentMessage);
  };

  /**
   * Handling the local state of this component while moving through commits in the
   * history
   */
  componentDidUpdate(
    prevProps: Readonly<CommitMessageProps>,
    prevState: Readonly<CommitMessageState>
  ): void {
    const { message } = prevProps;
    const currentMessage = this.props.message;
    const currentSelectedCommit = this.props.selectedCommit;

    if (!currentSelectedCommit && message !== currentMessage) {
      this.setState({ currentMessage: '' });
    }

    if (message !== currentMessage && currentSelectedCommit) {
      this.setState({ currentMessage: currentMessage });
    }
  }

  render() {
    const { currentMessage } = this.state;
    const { hasStagedFiles, disabled } = this.props;

    const handlers = {
      COMMIT: this.handleCommit,
    };

    return (
      <Pane>
        <Button iconBefore={GitCommitIcon} onClick={this.handleCommit}>
          {hasStagedFiles ? 'Commit' : 'No Files To Commit'}
        </Button>
        <HotKeys keyMap={keyMap} handlers={handlers}>
          <TextareaField
            // ref={inputRef}
            label="Commit Message"
            placeholder="Commit message goes in here..."
            spellCheck={true}
            disabled={disabled}
            value={currentMessage}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
              this.setState({ currentMessage: e.target.value });
            }}
            style={{ resize: 'none' }}
          />
        </HotKeys>
      </Pane>
    );
  }
}

// export const CommitMessage = ({
//   message,
//   disabled,
//   omniBarIsOpen,
//   hasStagedFiles,
// }) => {
//   const [inputRef, setFocus] = useFocus();
//   const [stateMessage, updateMessage] = useState(message);
//   const dispatch = useDispatch();

//   if (omniBarIsOpen === false) {
//     setFocus();
//   }

//   const handleCommit = () => {
//     if (!hasStagedFiles) {
//       toaster.warning(
//         'There is currently no files to commit. Please stage some files'
//       );
//       return;
//     }

//     dispatch(commitThunk(stateMessage));
//   };

//   const handlers = {
//     COMMIT: handleCommit,
//   };

//   return (
//     <Pane>
//       <Button iconBefore={GitCommitIcon} onClick={handleCommit}>
//         {hasStagedFiles ? 'Commit' : 'No Files To Commit'}
//       </Button>
//       <HotKeys keyMap={keyMap} handlers={handlers}>
//         <TextareaField
//           // ref={inputRef}
//           label="Commit Message"
//           placeholder="Commit message goes in here..."
//           spellCheck={true}
//           disabled={disabled}
//           value={message}
//           onChange={(e) => {
//             console.log('woah');
//             updateMessage(e.target.value);
//           }}
//           style={{ resize: 'none' }}
//         />
//       </HotKeys>
//     </Pane>
//   );
// };

const mapStateToProps = (state: any) => {
  return {
    omniBarIsOpen: omniBarIsOpenSelector(state),
    hasStagedFiles: getStagedFilesCount(state) > 0,
    selectedCommit: hasSelectedCommitSelector(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    dispatchCommitChanges: (message: string) => dispatch(commitThunk(message)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommitMessage);
