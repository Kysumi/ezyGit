import React, { useState } from 'react';
import { Collapse, Button, Icon, Text } from '@blueprintjs/core';
import DiffList from './DiffList';
const buttonStyle = {
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-start',
};

export const DiffCollection = ({ title, diffs, diffType }) => {
  const [isOpen, setOpen] = useState(true);

  const icon = isOpen ? 'chevron-up' : 'chevron-down';

  return (
    <div>
      <Button onClick={() => setOpen(!isOpen)} style={buttonStyle}>
        <div style={buttonStyle}>
          <Icon icon={icon} />
          <Text>{title}</Text>
        </div>
      </Button>
      <Collapse isOpen={isOpen} keepChildrenMounted={true}>
        <div style={{ paddingLeft: '10px', backgroundColor: '#e6eaed' }}>
          <DiffList items={diffs} diffType={diffType} />
        </div>
      </Collapse>
    </div>
  );
};
