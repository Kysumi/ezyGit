import React from 'react';
import SplitPane from 'react-split-pane';
import './paneStyles.css';
import GitCommitList from '../components/GitCommitList/GitCommitList';
import { getGitLogAction } from '../actions/gitCommitList.action';
import { connect } from 'react-redux';

export const MainView = (props: {
  left: any;
  right: any;
  loadSideListGitLog: any;
}) => {
  props.loadSideListGitLog();

  return (
    <SplitPane split="vertical" defaultSize="35%" minSize="10%" primary="first">
      <>
        <GitCommitList />
      </>
      <div>{props.right}</div>
    </SplitPane>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  loadSideListGitLog: () => dispatch(getGitLogAction()),
});

export default connect(
  null,
  mapDispatchToProps
)(MainView);
