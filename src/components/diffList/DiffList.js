import React from 'react';
import ReactList from 'react-list';
import DiffListItem from './DiffListItem';
import { StageButton } from './buttons/StageButton';
import { DiscardButton } from './buttons/DiscardButton';
import { connect } from 'react-redux';
import { UnstageButton } from './buttons/UnstageButton';
import { DeleteButton } from './buttons/DeleteButton';
import { stageFileThunk } from '../../store/repo/buttonThunks/stageFile';
import { deleteFileThunk } from '../../store/repo/buttonThunks/deleteFile';
import { unstageFileThunk } from '../../store/repo/buttonThunks/unstageFile';
import { discardFileThunk } from '../../store/repo/buttonThunks/discardFile';

class DiffList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 0,
    };
  }

  workingChangesButtons = (filePath) => {
    const { stageFile, discardFile } = this.props;
    return (
      <>
        <StageButton onClick={() => stageFile(filePath)} />
        <DiscardButton onClick={() => discardFile(filePath)} />
      </>
    );
  };

  stagedChangesButtons = (filePath) => {
    const { unstageFile } = this.props;
    return (
      <>
        <UnstageButton onClick={() => unstageFile(filePath)} />
      </>
    );
  };

  untrackedFilesButtons = (filePath) => {
    const { stageFile, deleteFile } = this.props;
    return (
      <>
        <StageButton onClick={() => stageFile(filePath)} />
        <DeleteButton onClick={() => deleteFile(filePath)} />
      </>
    );
  };

  getButtons = (filePath) => {
    const { diffType } = this.props;

    switch (diffType) {
      case 'working':
        return this.workingChangesButtons(filePath);
      case 'staged':
        return this.stagedChangesButtons(filePath);
      case 'untracked':
        return this.untrackedFilesButtons(filePath);
      default:
        throw 'Unsupported diff type was provided';
    }
  };

  renderItem = (index, key) => {
    const { items } = this.props;
    const { width } = this.state;

    const diff = items[index];

    return (
      <div key={key}>
        <DiffListItem
          diff={diff}
          viewStyle={width > 1000 ? 'split' : 'unified'}
        >
          {this.getButtons(diff.filePath)}
        </DiffListItem>
      </div>
    );
  };

  componentDidMount() {
    this.setState({ width: this.divRef.clientWidth });
  }

  render() {
    const { items } = this.props;

    return (
      <div
        ref={(element) => (this.divRef = element)}
        style={{ backgroundColor: '#ffffff' }}
      >
        {items ? (
          <ReactList
            itemRenderer={this.renderItem}
            length={items.length}
            type="simple"
          />
        ) : null}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    stageFile: (filePath) => dispatch(stageFileThunk(filePath)),
    deleteFile: (filePath) => dispatch(deleteFileThunk(filePath)),
    unstageFile: (filePath) => dispatch(unstageFileThunk(filePath)),
    discrardFile: (filePath) => dispatch(discardFileThunk(filePath)),
  };
};

export default connect(null, mapDispatchToProps)(DiffList);
