import React from 'react';
import ReactList from 'react-list';
import DiffListItem from './DiffListItem';
import { connect } from 'react-redux';
import { CommitDiff } from './type';
import styled from 'styled-components';
import { COLORS } from '../../styles/style';
import {
  StageButton,
  DiscardButton,
  UnstageButton,
  DeleteButton,
} from './buttons/GitButtons';
import {
  stageFileThunk,
  deleteFileThunk,
  unstageFileThunk,
  discardFileThunk,
} from '../../store/repo/gitThunks';

export enum DiffTypeEnum {
  staged,
  working,
  untracked,
}

interface DiffListProps {
  deleteFile: (filePath: string) => void;
  stageFile: (filePath: string) => void;
  unstageFile: (filePath: string) => void;
  discardFile: (filePath: string) => void;
  diffType: DiffTypeEnum;
  items: Array<CommitDiff>;
}

const StyledDiv = styled.div`
  background-color: ${COLORS.WHITE};
  & > div {
    display: grid;
    grid-row-gap: 0.5rem;
  }
`;

class DiffList extends React.Component<DiffListProps> {
  workingChangesButtons = (filePath: string) => {
    const { stageFile, discardFile } = this.props;
    return (
      <>
        <StageButton onClick={() => stageFile(filePath)} />
        <DiscardButton onClick={() => discardFile(filePath)} />
      </>
    );
  };

  stagedChangesButtons = (filePath: string) => {
    const { unstageFile } = this.props;
    return (
      <>
        <UnstageButton onClick={() => unstageFile(filePath)} />
      </>
    );
  };

  untrackedFilesButtons = (filePath: string) => {
    const { stageFile, deleteFile } = this.props;
    return (
      <>
        <StageButton onClick={() => stageFile(filePath)} />
        <DeleteButton onClick={() => deleteFile(filePath)} />
      </>
    );
  };

  getButtons = (filePath: string) => {
    const { diffType } = this.props;

    switch (diffType) {
      case DiffTypeEnum.working:
        return this.workingChangesButtons(filePath);
      case DiffTypeEnum.staged:
        return this.stagedChangesButtons(filePath);
      case DiffTypeEnum.untracked:
        return this.untrackedFilesButtons(filePath);

      // This case is for showing diff history
      default:
        return null;
    }
  };

  renderItem = (index: number, key: number | string) => {
    const { items } = this.props;

    const diff = items[index];

    return (
      <div key={key}>
        <DiffListItem diff={diff} viewStyle={'split'}>
          {this.getButtons(diff.filePath)}
        </DiffListItem>
      </div>
    );
  };

  render() {
    const { items } = this.props;

    return (
      <StyledDiv>
        {items ? (
          <ReactList
            itemRenderer={this.renderItem}
            length={items.length}
            type="simple"
          />
        ) : null}
      </StyledDiv>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    stageFile: (filePath: string) => dispatch(stageFileThunk(filePath)),
    deleteFile: (filePath: string) => dispatch(deleteFileThunk(filePath)),
    unstageFile: (filePath: string) => dispatch(unstageFileThunk(filePath)),
    discardFile: (filePath: string) => dispatch(discardFileThunk(filePath)),
  };
};

export default connect(null, mapDispatchToProps)(DiffList);
