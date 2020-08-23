import React, { useState } from 'react';
import DiffList from '../../../components/diffList/DiffList';
import { useSelector } from 'react-redux';
import {
  getCurrentBranchDiffs,
  getUntrackedFilesSelector,
  getStagedFilesSelector,
} from '../../../store/repo/RepoSelector';
import { Collapse, Button, Icon, Text } from '@blueprintjs/core';

const buttonStyle = {
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-start',
};

const DiffCollection = ({ title, diffs, diffType }) => {
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

export const PendingChangesView = () => {
  const diffs = useSelector(getCurrentBranchDiffs);
  const pendingFiles = useSelector(getUntrackedFilesSelector);
  const stagedFiles = useSelector(getStagedFilesSelector);

  return (
    <div>
      <DiffCollection
        title={'Working Changes'}
        diffs={diffs}
        diffType={'working'}
      />
      <DiffCollection
        title={'Staged Changes'}
        diffs={stagedFiles}
        diffType={'staged'}
      />
      <DiffCollection
        title={'Untracked Files'}
        diffs={pendingFiles}
        diffType={'untracked'}
      />
    </div>
  );
};
