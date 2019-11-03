import React from 'react';
import { Collapse, Icon } from '@blueprintjs/core';
import Diff from './Diff';
import { IconNames } from '@blueprintjs/icons';
import './header.css';
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
          onClick={() => onClickCollapse(this.props.index)}
          className={'headerContainer'}
        >
          <span className={'headerTitle'}>
            <Icon icon={IconNames.CODE} iconSize={25} />
            {'  '}
            <b>{fileName}</b>
          </span>
          <span className={'headerCollapseIcon'}>
            <Icon
              icon={isOpen ? IconNames.CHEVRON_UP : IconNames.CHEVRON_DOWN}
              iconSize={25}
            />
          </span>
        </div>
        <Collapse isOpen={isOpen} keepChildrenMounted={true}>
          <Diff hunks={hunks} diffType={diffType} oldSource={oldSource} />
        </Collapse>
      </div>
    );
  }
}
