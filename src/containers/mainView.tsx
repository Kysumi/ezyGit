import React from 'react';
import SplitPane from 'react-split-pane';
import './paneStyles.css';
import GitCommitList from '../components/GitCommitList/GitCommitList';
import { getGitLogAction } from '../actions/gitCommitList.action';
import { connect } from 'react-redux';
import DiffViewerList from '../components/DiffView/DiffViewerList';
import { getGitDiffAction } from '../actions/gitDiff.action';
import Scrollbars from 'react-custom-scrollbars';
import NavBar from '../components/NavBar/NavBar';

export const MainView = (props: {
  left: any;
  right: any;
  loadSideListGitLog: any;
  loadDefaultCommit: any;
}) => {
  props.loadSideListGitLog();
  props.loadDefaultCommit();

  return (
    <div>
      <div>
        <NavBar branchName="Test" />
      </div>
      <div className={'mainContent'}>
        <SplitPane
          split="vertical"
          defaultSize="35%"
          minSize="10%"
          primary="first"
        >
          <div style={{ height: '100vh' }}>
            <Scrollbars>
              <div style={{ marginRight: '5px' }}>
                <GitCommitList />
              </div>
            </Scrollbars>
          </div>
          <div style={{ height: '100vh' }}>
            <Scrollbars>
              <div style={{ margin: '20px' }}>
                <DiffViewerList />
              </div>
            </Scrollbars>
          </div>
        </SplitPane>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  loadSideListGitLog: () => dispatch(getGitLogAction()),
  loadDefaultCommit: () => dispatch(getGitDiffAction()),
});

export default connect(null, mapDispatchToProps)(MainView);
