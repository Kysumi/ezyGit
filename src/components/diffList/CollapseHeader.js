import React, { useState } from 'react';
import { Collapse, Icon } from '@blueprintjs/core';

const containerStyle = {
  boxShadow: '2px 2px 9px 0px rgba(50, 50, 50, 0.4)',
  borderRadius: '5px',
  backgroundColor: '#ffffff',
  marginBottom: '6px',
};

const buttonStyle = {
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-start',
  marginRight: '10px',
  marginLeft: '10px',
  alignContent: 'center',
};

const spacerStyle = {
  width: '2px',
  backgroundColor: '#767A76',
  marginRight: '10px',
  marginLeft: '10px',
};

const horizontalStyle = {
  width: '100%',
  height: '2px',
  backgroundColor: '#767A76',
};

const titleStyle = {
  display: 'flex',
  alignItems: 'center',
};

export const CollapseHeader = ({ title, children }) => {
  const [isOpen, setOpen] = useState(true);
  const icon = isOpen ? 'chevron-down' : 'chevron-right';

  return (
    <div style={{ backgroundColor: '#e6eaed' }}>
      <div style={containerStyle}>
        <div onClick={() => setOpen(!isOpen)} style={buttonStyle}>
          <div style={{ padding: '10px' }}>
            <Icon icon={icon} iconSize={24} color={'#647C90'} />
          </div>
          <div style={spacerStyle} />
          <span style={titleStyle}>
            <b>{title}</b>
          </span>
        </div>
        {isOpen ? <div style={horizontalStyle} /> : null}
        <Collapse isOpen={isOpen} keepChildrenMounted={true}>
          {children}
        </Collapse>
      </div>
    </div>
  );
};
