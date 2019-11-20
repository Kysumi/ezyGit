import React from 'react';
import SplitPane from 'react-split-pane';
import './paneStyles.css';
import GitCommitList from '../components/GitCommitList/GitCommitList';
import { getGitLogAction } from '../actions/gitCommitList.action';
import { connect } from 'react-redux';
import DiffViewerList from '../components/DiffView/DiffViewerList';
import { getGitDiffAction } from '../actions/gitDiff.action';

export const MainView = (props: {
  left: any;
  right: any;
  loadSideListGitLog: any;
  loadDefaultCommit: any;
}) => {
  props.loadSideListGitLog();
  props.loadDefaultCommit();

  return (
    <SplitPane split="vertical" defaultSize="35%" minSize="10%" primary="first">
      <div style={{ paddingRight: '5px' }}>
        <GitCommitList />
      </div>
      <div style={{ margin: '20px' }}>
        <DiffViewerList />
      </div>
    </SplitPane>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  loadSideListGitLog: () => dispatch(getGitLogAction()),
  loadDefaultCommit: () => dispatch(getGitDiffAction()),
});

export default connect(null, mapDispatchToProps)(MainView);
