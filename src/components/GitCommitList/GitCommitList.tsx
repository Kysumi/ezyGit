import React from 'react';
import { GitCommitListItem } from './GitCommitListItem';
import ReactList from 'react-list';
import { GitCommitLog } from '../../git/git';
import { connect } from 'react-redux';
import { State } from '../../reducers';
import { getGitDiffAction } from '../../actions/gitDiff.action';

interface ISideListProps {
  data: Array<GitCommitLog>;
  loadCommitDiff: (oid: string, parent: string) => void;
}

export const GitCommitList: React.FunctionComponent<ISideListProps> = props => {
  const handleListItemClick = (commitOid: string, parent: string): void => {
    // AppToaster.show({ message: 'GIT COMMIT OID:' + commitOid });
    props.loadCommitDiff(commitOid, parent);
  };

  const renderGitCommit = (index: number, id: number | string) => {
    const commit = props.data[index];
    return (
      <GitCommitListItem
        key={id}
        commit={commit}
        onClickCallback={handleListItemClick}
      />
    );
  };

  return (
    <div>
      <ReactList
        itemRenderer={renderGitCommit}
        length={props.data.length}
        type="variable"
        threshold={100}
      />
    </div>
  );
};

const mapStateToProps = (state: State) => {
  return {
    data: state.gitCommitLog!,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  loadCommitDiff: (oid: string = '', parent: string) => {
    console.log('PARENT! ' + parent);
    const action = getGitDiffAction();
    action.payload = { target: oid, parent: parent };
    dispatch(action);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(GitCommitList);
