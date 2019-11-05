import React, { useState } from 'react';
import { GitCommitListItem } from '../components/GitCommitList/GitCommitListItem';
import { GitCommitLog } from '../git/git';
import { CommitDescriptionWithOid } from 'isomorphic-git';

export default {
  title: 'Commit List',
};

export const CommitListItemDemo = () => {
  const commitDetails: CommitDescriptionWithOid = {
    oid: '12312313asdadasd',
    message: 'Example Commit Message',
    tree: 'adadasdasasd',
    parent: [],
    author: {
      name: 'Scott',
      email: 'example@example.com',
      timestamp: 123123,
      timezoneOffset: 123,
    },
    committer: {
      name: 'Scott',
      email: 'example@example.com',
      timestamp: 123123,
      timezoneOffset: 123,
    },
  };

  const commit: GitCommitLog = {
    isHistory: false,
    commit: commitDetails,
  };

  const onClick = (oid: string, parent: string) => console.log('placeholder');

  return (
    <GitCommitListItem
      index={1}
      key={1}
      commit={commit}
      onClickCallback={onClick}
    />
  );
};
