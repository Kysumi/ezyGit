import React, { useRef } from 'react';
import { Classes } from '@blueprintjs/core';
import { omniBarIsOpenSelector } from '../../store/view/ViewSelector';
import { connect } from 'react-redux';
const classNames = require('classnames');

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
    <textarea
      className={classNames(Classes.INPUT, Classes.FILL)}
      readOnly={disabled}
      ref={inputRef}
      autoFocus={true}
      defaultValue={message}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    omniBarIsOpen: omniBarIsOpenSelector(state),
  };
};

export default connect(mapStateToProps)(CommitMessage);
