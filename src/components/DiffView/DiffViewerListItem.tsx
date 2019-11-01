import React from 'react';
import { Collapse, Icon } from '@blueprintjs/core';
import Diff from './Diff';
import { IconNames } from '@blueprintjs/icons';
import 'react-diff-view/style/index.css';
interface IDiffViewerProps {
  oldSource: string;
  diffType: string;
  hunks: any;
  fileName: string;
  isOpen: boolean;
  onClickCollapse: any;
  index: number;
}

interface IDiffViewerState {}

export default class DiffViewerListItem extends React.Component<
  IDiffViewerProps,
  IDiffViewerState
> {
  render() {
    const {
      oldSource,
      diffType,
      hunks,
      fileName,
      onClickCollapse,
      isOpen,
    } = this.props;

    return (
      <div>
        <div
          className="diff-item-header"
          onClick={() => onClickCollapse(this.props.index)}
        >
          <Icon
            icon={isOpen ? IconNames.CHEVRON_DOWN : IconNames.CHEVRON_RIGHT}
            iconSize={Icon.SIZE_LARGE}
          />
          {fileName}
        </div>
        <Collapse isOpen={isOpen}>
          <Diff hunks={hunks} diffType={diffType} oldSource={oldSource} />
        </Collapse>
      </div>
    );
  }
}
