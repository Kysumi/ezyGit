import React, { useState } from 'react';
import { getGitDifference } from '../git/GetGitDifference';
import DiffViewerListItem from '../components/DiffView/DiffViewerListItem';
import { DiffViewerList } from '../components/DiffView/DiffViewerList';
import { FileStatusChanges } from '../git/git';

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

export const MultipleChanges = () => {
  const records: FileStatusChanges[] = [
    {
      modified: `        border: 1px solid red;
      width: 120px;
      height: 0px;`,
      original: `.thin_hr {
        margin-top:0;
        margin-bottom:0;
        border:0;
        height:1px;
        background-color:black;
        }`,
      path: '/src/app.tsx',
      type: 'change',
      hashA: '1',
      hashB: '2',
    },
    {
      modified: 'this is an example',
      original: 'this ia new example showing the diff',
      path: '/src/app.tsx',
      type: 'change',
      hashA: '1',
      hashB: '2',
    },
  ];

  return <DiffViewerList gitDiff={records} />;
};
