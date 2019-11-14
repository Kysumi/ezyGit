import React from 'react';
import SplitPane from 'react-split-pane';
import './paneStyles.css';
import GitCommitList from '../components/GitCommitList/GitCommitList';

export const MainView = (props: { left: any; right: any }) => {
  return (
    <SplitPane split="vertical" defaultSize="20%" minSize="10%" primary="first">
      <div>
        <GitCommitList />
      </div>
      <div>{props.right}</div>
    </SplitPane>
  );
};

export default MainView;
