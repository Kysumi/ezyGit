import React, { useRef } from 'react';
import { omniBarIsOpenSelector } from '../../store/view/ViewSelector';
import { connect } from 'react-redux';
import { Pane, Label } from 'evergreen-ui';
import TextareaAutosize from 'react-textarea-autosize';

//TODO move out
const useFocus = () => {
  const htmlElRef = useRef(null);
  const setFocus = () => {
    htmlElRef.current && htmlElRef.current.focus();
  };

  return [htmlElRef, setFocus];
};

const Style = {
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '20px',
  boxSizing: 'border-box',
  fontFamily: `'SF UI Text', -apple-system, BlinkMacSystemFont, 'Segoe UI',
  Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
  'Segoe UI Symbol'`,
  boxShadow:
    'rgba(67, 90, 111, 0.3) 0px 0px 0px 1px inset, rgba(67, 90, 111, 0.14) 0px 1px 2px inset',
  width: '100%',
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
      <styledTemp>
        <TextareaAutosize
          style={Style}
          ref={inputRef}
          autoFocus={true}
          placeholder={'Enter commit message here..'}
          minRows={4}
          value={message ?? ''}
          disabled={disabled}
        />
      </styledTemp>
    </Pane>
  );
};

const mapStateToProps = (state) => {
  return {
    omniBarIsOpen: omniBarIsOpenSelector(state),
  };
};

export default connect(mapStateToProps)(CommitMessage);
