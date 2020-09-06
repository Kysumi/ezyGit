import React, { useRef } from 'react';
import { omniBarIsOpenSelector } from '../../store/view/ViewSelector';
import { connect } from 'react-redux';
import { Pane, Label, Textarea } from 'evergreen-ui';

//TODO move out
const useFocus = () => {
  const htmlElRef = useRef(null);
  const setFocus = () => {
    htmlElRef.current && htmlElRef.current.focus();
  };

  return [htmlElRef, setFocus];
};

export const CommitMessage = ({ message, disabled, omniBarIsOpen }) => {
  const [inputRef, setFocus] = useFocus();

  if (omniBarIsOpen === false) {
    setFocus();
  }

  return (
    <Pane>
      <Label htmlFor="commitMessageField" marginBottom={4} display="block">
        Commit Message
      </Label>
      <textarea
        id="commitMessageField"
        disabled={disabled}
        ref={inputRef}
        autoFocus={true}
        defaultValue={message}
      />
    </Pane>
  );
};

const mapStateToProps = (state) => {
  return {
    omniBarIsOpen: omniBarIsOpenSelector(state),
  };
};

export default connect(mapStateToProps)(CommitMessage);
