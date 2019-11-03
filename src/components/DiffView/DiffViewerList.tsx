import React from 'react';
import { getGitDifference } from '../../git/GetGitDifference';
import { FileStatusChanges } from '../../git/git';
import { Scrollbars } from 'react-custom-scrollbars';
import ReactList from 'react-list';
import DiffViewerListItem from './DiffViewerListItem';
import { connect } from 'react-redux';
import { State } from '../../reducers';
import { Button } from '@blueprintjs/core';

interface IDiffViewerProps {
  gitDiff: FileStatusChanges[];
}

interface IState {
  collapsedAll: boolean;
  collapsedInt: Array<boolean>;
}

export class DiffViewerList extends React.Component<IDiffViewerProps, IState> {
  state = {
    collapsedAll: false,
    collapsedInt: Array<boolean>(),
  };

  componentDidUpdate() {
    const { collapsedInt } = this.state;
    const { gitDiff } = this.props;

    if (collapsedInt.length != gitDiff.length) {
      const defaultState = gitDiff.map(() => true);
      this.setState({ collapsedInt: defaultState, collapsedAll: false });
    }
  }

  onClickCollapse = (key: number) => {
    let currentCollapsedState = this.state.collapsedInt;
    currentCollapsedState[key] = !currentCollapsedState[key];
    this.setState({ collapsedInt: currentCollapsedState });
  };

  /**
   * Handles when the button is clicked to collapse or un-collapse
   * the diffs.
   */
  collapseAll = () => {
    const { collapsedAll } = this.state;
    const temp = this.state.collapsedInt.map(() => {
      return this.state.collapsedAll;
    });

    this.setState({ collapsedInt: temp, collapsedAll: !collapsedAll });
  };

  renderGitCommit = (index: number, key: number | string) => {
    const record = this.props.gitDiff[index];
    const [diff] = getGitDifference(record.modified, record.original);

    return (
      <>
        <DiffViewerListItem
          key={index}
          hunks={diff.hunks}
          diffType={diff.type}
          oldSource={record.original}
          fileName={record.path}
          isOpen={this.state.collapsedInt[index]}
          onClickCollapse={this.onClickCollapse}
          index={index}
        />
        <br />
      </>
    );
  };

  render() {
    const { collapsedAll } = this.state;
    const { gitDiff } = this.props;

    return (
      <>
        <span style={{ display: 'inline-block', fontSize: '15px' }}>
          <b>File Changes</b>{' '}
          {gitDiff.length > 0 ? (
            <a onClick={() => this.collapseAll()}>
              {collapsedAll ? 'Expand All' : 'Collapse All'}
            </a>
          ) : null}
        </span>

        <br />
        <br />
        <ReactList
          itemRenderer={this.renderGitCommit}
          length={gitDiff.length}
          type="variable"
          threshold={5000}
        />
      </>
    );
  }
}

const mapStateToProps = (state: State) => {
  return {
    gitDiff: state.gitDiff,
  };
};

export default connect(mapStateToProps)(DiffViewerList);
