import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, ArrowUpIcon, ArrowDownIcon } from 'evergreen-ui';
import { useDispatch } from 'react-redux';
import { pullThunk, pushThunk } from '../../store/repo/gitThunks';

const RightHandSideStyle = styled.div`
  display: flex;
  flex-direction: row;
  width: 25%;
  justify-content: flex-end;
  align-items: center;
`;

export const RightHandSide = () => {
  const [auth, setAuth] = useState(false);
  const dispatch = useDispatch();

  const handlePull = () => {
    dispatch(pullThunk());
  };

  const handlePush = () => {
    // @ts-ignore
    dispatch(pushThunk()).then((res) => setAuth(res));
  };
  return (
    <RightHandSideStyle>
      <Button
        iconBefore={ArrowDownIcon}
        style={{ marginRight: '5px' }}
        onClick={handlePull}
      >
        Pull
      </Button>
      <Button iconBefore={ArrowUpIcon} onClick={handlePush}>
        Push
      </Button>
    </RightHandSideStyle>
  );
};
