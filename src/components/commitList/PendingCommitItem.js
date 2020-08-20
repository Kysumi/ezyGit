import React from 'react';
import { Classes, Text } from '@blueprintjs/core';
import { connect } from 'react-redux';
import { stringToColour } from '../../helper/stringToColor';
import {
  getBranchNameSelector,
  getStagedFilesCount,
} from '../../store/repo/RepoSelector';
const classNames = require('classnames');

export const PendingCommitItem = ({
  isSelected,
  onClick,
  stagedChangesCount,
  color,
}) => {
  const style = {
    margin: '5px',
    boxShadow: '10px 20px 32px -5px rgba(194,190,194,1)',
    borderLeft: '10px solid ' + color,
    borderRadius: '5px',
    backgroundColor: isSelected ? '#e6eaed' : '#ffffff',
  };

  return (
    <div className={Classes.CARD} style={style} onClick={onClick}>
      <Text className={classNames(Classes.TEXT_MUTED, Classes.TEXT_SMALL)}>
        {stagedChangesCount ? `(${stagedChangesCount}) Staged Changes` : null}
      </Text>
      <Text ellipsize={true}>Pending Changes</Text>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    stagedChangesCount: getStagedFilesCount(state),
    color: stringToColour(getBranchNameSelector(state)),
  };
};

export default connect(mapStateToProps)(PendingCommitItem);
