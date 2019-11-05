import React from 'react';
import { GitCommitLog } from '../../git/git';
import GitCommitDetails from './GitCommitDetails';
import { GitStatusDetails } from './GitStatusDetails';
import './style.css';

export interface ICommitListItem {
  index: number;
  key: number | string;
  commit: GitCommitLog;
  onClickCallback: (oid: string, parent: string) => void;
}

export const GitCommitListItem = (props: ICommitListItem): any => {
  const { key, index, commit, onClickCallback } = props;

  return (
    <div key={key} className="gitCommitListItem">
      {commit.commit
        ? GitCommitDetails(commit.commit, onClickCallback)
        : GitStatusDetails(onClickCallback)}
    </div>
  );
};

export default GitCommitListItem;
