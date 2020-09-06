import React, { useState, ReactNode } from 'react';
import { StyledCard } from '../../styles/StyledCard';
import { Collapse } from 'react-collapse';
import { Icon, ChevronDownIcon, ChevronRightIcon, Text } from 'evergreen-ui';

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
  const icon = isOpen ? ChevronDownIcon : ChevronRightIcon;

  return (
    <StyledCard>
      <div onClick={() => setOpen(!isOpen)} style={buttonStyle}>
        <div style={{ padding: '10px', display: 'flex', alignItems: 'center' }}>
          <Icon icon={icon} color={'#647C90'} />
        </div>
        <div style={spacerStyle} />
        <span style={titleStyle}>
          <Text>
            <b>{title}</b>
          </Text>
        </span>
        <div style={rightButtonsStyle}>{rightButtons}</div>
      </div>
      {isOpen ? <div style={horizontalStyle} /> : null}
      <Collapse isOpened={isOpen}>{children}</Collapse>
    </StyledCard>
  );
};
