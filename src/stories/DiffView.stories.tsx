import React, { useState } from 'react';
import { getGitDifference } from '../git/GetGitDifference';
import DiffViewerListItem from '../components/DiffView/DiffViewerListItem';

export default {
  title: 'Diff View',
};

export const DiffDemo = () => {
  const record = {
    modified: 'this is an example',
    original: 'this ia new example showing the diff',
    path: '/src/app.tsx',
  };
  const [diff] = getGitDifference(record.modified, record.original);

  const [isOpen, setClosed] = useState(true);

  return (
    <DiffViewerListItem
      key={1}
      hunks={diff.hunks}
      diffType={diff.type}
      oldSource={record.original}
      fileName={record.path}
      isOpen={isOpen}
      onClickCollapse={() => setClosed(!isOpen)}
      index={1}
    />
  );
};
