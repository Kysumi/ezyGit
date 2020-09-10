import React, { MouseEventHandler } from 'react';
import { Text } from 'evergreen-ui';
import { connect } from 'react-redux';
import { stringToColour } from '../../helper/stringToColor';
import {
  getBranchNameSelector,
  getStagedFilesCount,
} from '../../store/repo/RepoSelector';
import { CommitListItemStyle } from './CommitListItemStyle';

interface PendingCommitItemProps {
  isSelected: boolean;
  onClick: MouseEventHandler;
  stagedChangesCount: number;
  color: string;
}

export const PendingCommitItem = ({
  isSelected,
  onClick,
  stagedChangesCount,
  color,
}: PendingCommitItemProps) => {
  return (
    <CommitListItemStyle
      color={color}
      isSelected={isSelected}
      onClick={onClick}
    >
      <Text color="muted">
        {stagedChangesCount ? `(${stagedChangesCount}) Staged Changes` : null}
      </Text>
      <Text>Pending Changes</Text>
    </CommitListItemStyle>
  );
};

const mapStateToProps = (state: any) => {
  return {
    stagedChangesCount: getStagedFilesCount(state),
    color: stringToColour(getBranchNameSelector(state)),
  };
};

export default connect(mapStateToProps)(PendingCommitItem);
