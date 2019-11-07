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
    message:
      'Addding some doc blocks with info. Fixed up the window scrolling at the wrong time. Making the button only show when there is a new div. Fixed up the collapse all button that was not working. adding some more words here to exceed the 2 line limit... hopefully this will be long enough now.',
    tree: 'adadasdasasd',
    parent: [],
    author: {
      name: 'Scott',
      email: 'example@example.com',
      timestamp: 1572911747,
      timezoneOffset: 123,
    },
    committer: {
      name: 'Scott',
      email: 'example@example.com',
      timestamp: 1572911747,
      timezoneOffset: 123,
    },
  };

  const commit: GitCommitLog = {
    isHistory: false,
    commit: commitDetails,
  };

  const onClick = (oid: string, parent: string) => console.log('placeholder');

  return (
    <GitCommitListItem key={1} commit={commit} onClickCallback={onClick} />
  );
};
