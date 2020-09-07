import React, { useRef } from 'react';
import { omniBarIsOpenSelector } from '../../store/view/ViewSelector';
import { connect } from 'react-redux';
import { Pane, Label } from 'evergreen-ui';
import styled from 'styled-components';
import { COLORS } from '../../styles/style';

//TODO move out
const useFocus = () => {
  const htmlElRef = useRef(null);
  const setFocus = () => {
    htmlElRef.current && htmlElRef.current.focus();
  };

  return [htmlElRef, setFocus];
};

const StyledTextArea = styled.span`
  width: 100%;
  box-shadow: rgba(67, 90, 111, 0.3) 0px 0px 0px 1px inset,
    rgba(67, 90, 111, 0.14) 0px 1px 2px inset;
  min-height: 40px;
  border: 1px;
  display: block;
  padding: 5px;
  font-family: 'SF UI Text', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
    'Segoe UI Symbol';

  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  box-sizing: border-box;

  &:empty:before {
    content: attr(placeholder);
    color: #888;
    font-style: italic;
  }

  &[contentEditable='false'] {
    background-color: ${COLORS.TRIM};
  }
`;

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
      <StyledTextArea
        role="textbox"
        contentEditable={!disabled}
        placeholder={'Enter commit message here..'}
        ref={inputRef}
        autoFocus={true}
      >
        {message}
      </StyledTextArea>
    </Pane>
  );
};

const mapStateToProps = (state) => {
  return {
    omniBarIsOpen: omniBarIsOpenSelector(state),
  };
};

export default connect(mapStateToProps)(CommitMessage);
