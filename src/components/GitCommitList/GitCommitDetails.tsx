import React from 'react';
import { CommitDescriptionWithOid } from 'isomorphic-git';
import moment from 'moment';
import BranchNameTag from '../NavBar/CustomBranchSelector/BranchNameTag';
import LinesEllipsis from 'react-lines-ellipsis';

export const GitCommitDetails = (
  branch: string,
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
      <div className={'gitCommitHeaderContainer'}>
        <div>
          <BranchNameTag branchName={branch} />
        </div>
        <div style={{ textAlign: 'right', flex: '2 50%' }}>
          committed {moment(date).fromNow()}
        </div>
      </div>
      <div className={'gitCommitHeaderContainer'}>
        <LinesEllipsis
          text={commit.message}
          maxLine="2"
          ellipsis="..."
          trimRight
          basedOn="letters"
        />
        <div style={{ textAlign: 'right', flex: '2 20%' }}>{author.name}</div>
      </div>
    </div>
  );
};

export default GitCommitDetails;
