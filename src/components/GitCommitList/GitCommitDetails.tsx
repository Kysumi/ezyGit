import React from 'react';
import { CommitDescriptionWithOid } from 'isomorphic-git';
import moment from 'moment';

export const GitCommitDetails = (
  commit: CommitDescriptionWithOid,
  onClickCallback: (oid: string, parent: string) => void
) => {
  const author = commit.author;
  const date = new Date(author.timestamp * 1000 + author.timezoneOffset * 1000);

  return (
    <div
      onClick={() => {
        // Only supporting the first parent for the time being
        onClickCallback(commit.oid, commit.parent[0]);
      }}
    >
      <div>{commit.message}</div>
      <div>
        <span style={{ width: '50%', display: 'inline-block' }}>
          committed {moment(date).fromNow()}
        </span>
        <span
          style={{
            textAlign: 'right',
            width: '50%',
            display: 'inline-block',
          }}
        >
          {author.name}
        </span>
      </div>
    </div>
  );
};

export default GitCommitDetails;
