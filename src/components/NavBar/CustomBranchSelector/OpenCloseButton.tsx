import React from 'react';
import { Button } from '@blueprintjs/core';
import Icon from '@iconify/react';
import addCircle from '@iconify/icons-ion/add-circle';
import closeCircleSharp from '@iconify/icons-ion/close-circle-sharp';

const OpenCloseButton = (props: {
  func: (props: boolean) => void;
  open: boolean;
}) => {
  const iconToUse = props.open ? closeCircleSharp : addCircle;

  return (
    <Button
      minimal={true}
      onClick={() => {
        props.func(!props.open);
      }}
    >
      <Icon icon={iconToUse} width={20} style={{ verticalAlign: 'middle' }} />
    </Button>
  );
};

export default OpenCloseButton;
