import React from 'react';
import { GitCommitLog } from '../../git/git';
import GitCommitDetails from './GitCommitDetails';
import { GitStatusDetails } from './GitStatusDetails';
import './style.css';

export interface ICommitListItem {
  commit: GitCommitLog;
  onClickCallback: (oid: string, parent: string) => void;
}

export const GitCommitListItem = (props: ICommitListItem): any => {
  const { commit, onClickCallback } = props;
  return (
    <div className="gitCommitListItem">
      {commit.commit
        ? GitCommitDetails(
            commit.branch ? commit.branch : 'NO BRANCH!',
            commit.commit,
            onClickCallback
          )
        : GitStatusDetails(onClickCallback)}
    </div>
  );
};

export default GitCommitListItem;
