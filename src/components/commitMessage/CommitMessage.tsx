import React, { Component, ChangeEvent } from 'react';
import {
  omniBarIsOpenSelector,
  hasSelectedCommitSelector,
} from '../../store/view/ViewSelector';
import { connect } from 'react-redux';
import { Button, GitCommitIcon, toaster } from 'evergreen-ui';
import { getStagedFilesCount } from '../../store/repo/RepoSelector';
import { HotKeys } from 'react-hotkeys';
import { commitThunk } from '../../store/repo/gitThunks';
import styled from 'styled-components';

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

const StyledTextArea = styled.textarea`
  width: 100%;
  box-sizing: border-box;
  border: none;
  background-color: white;
  box-shadow: inset 0 0 0 1px rgba(67, 90, 111, 0.3),
    inset 0 1px 2px rgba(67, 90, 111, 0.14);

  -webkit-appearance: none;
  resize: none;

  padding-top: 8px;
  padding-bottom: 8px;
  padding-right: 10px;
  padding-left: 10px;

  border-bottom-left-radius: 3px;
  border-top-left-radius: 3px;
  border-bottom-right-radius: 3px;
  border-top-right-radius: 3px;

  min-height: 80px;

  /* FONT */
  font-weight: 400;
  font-size: 14px;
  color: #425a70;
  font-family: 'SF UI Text', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
    'Segoe UI Symbol';
  line-height: 20px;
  letter-spacing: -0.05px;

  &:disabled {
    cursor: not-allowed;
    box-shadow: inset 0 0 0 1px rgba(67, 90, 111, 0.14);
    background-color: #f5f6f7;
  }
`;

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
      <div>
        <HotKeys keyMap={keyMap} handlers={handlers}>
          <StyledTextArea
            value={currentMessage}
            placeholder={'Commit message goes in here...'}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
              this.setState({ currentMessage: e.target.value });
            }}
            spellCheck={true}
            disabled={disabled}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button iconBefore={GitCommitIcon} onClick={this.handleCommit}>
              {hasStagedFiles ? 'Commit' : 'No Files To Commit'}
            </Button>
          </div>
        </HotKeys>
      </div>
    );
  }
}

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
