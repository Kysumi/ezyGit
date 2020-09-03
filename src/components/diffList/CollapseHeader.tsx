import React, { useState, ReactNode } from 'react';
import { Collapse, Icon } from '@blueprintjs/core';
import { CardStyle } from '../../styles/CardStyle';

// const containerStyle = {
//   boxShadow: '2px 2px 9px 0px rgba(50, 50, 50, 0.4)',
//   borderRadius: '5px',
//   backgroundColor: '#ffffff',
//   marginBottom: '6px',
// };

const buttonStyle = {
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-start',
  alignContent: 'center',
  height: '40px',
};

const spacerStyle = {
  width: '3px',
  backgroundColor: '#767A76',
  marginRight: '10px',
};

const horizontalStyle = {
  width: '100%',
  height: '2px',
  backgroundColor: '#767A76',
};

const titleStyle = {
  display: 'flex',
  alignItems: 'center',
  width: '100%',
};

const rightButtonsStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
  width: '30%',
};

interface CollapseHeaderProps {
  title: string;
  children: ReactNode;
  rightButtons?: ReactNode;
}

export const CollapseHeader = ({
  title,
  children,
  rightButtons = null,
}: CollapseHeaderProps) => {
  const [isOpen, setOpen] = useState(true);
  const icon = isOpen ? 'chevron-down' : 'chevron-right';

  return (
    <div style={{ backgroundColor: '#e6eaed', borderRadius: '5px' }}>
      <CardStyle>
        <div onClick={() => setOpen(!isOpen)} style={buttonStyle}>
          <div
            style={{ padding: '10px', display: 'flex', alignItems: 'center' }}
          >
            <Icon icon={icon} color={'#647C90'} />
          </div>
          <div style={spacerStyle} />
          <span style={titleStyle}>
            <b>{title}</b>
          </span>
          <div style={rightButtonsStyle}>{rightButtons}</div>
        </div>
        {isOpen ? <div style={horizontalStyle} /> : null}
        <Collapse isOpen={isOpen} keepChildrenMounted={true}>
          {children}
        </Collapse>
      </CardStyle>
    </div>
  );
};
