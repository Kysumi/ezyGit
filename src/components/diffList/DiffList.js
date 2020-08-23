import React from 'react';
import ReactList from 'react-list';
import DiffListItem from './DiffListItem';
import { StageButton } from './buttons/StageButton';
import { DiscardButton } from './buttons/DiscardButton';
import { connect } from 'react-redux';
import { stageFileThunk } from '../../store/repo/Repo';
import { UnstageButton } from './buttons/UnstageButton';
import { DeleteButton } from './buttons/DeleteButton';

class DiffList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 0,
    };
  }

  workingChangesButtons = (filePath) => {
    const { stageFile } = this.props;
    return (
      <>
        <StageButton onClick={() => stageFile(filePath)} />
        <DiscardButton onClick={() => console.log('Clicked Discard Button')} />
      </>
    );
  };

  stagedChangesButtons = (filePath) => {
    return (
      <>
        <UnstageButton onClick={() => console.log('Unstaged button clicked')} />
      </>
    );
  };

  untrackedFilesButtons = (filePath) => {
    const { stageFile } = this.props;
    return (
      <>
        <StageButton onClick={() => stageFile(filePath)} />
        <DeleteButton onClick={() => console.log('Unstaged button clicked')} />
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
  };
};

export default connect(null, mapDispatchToProps)(DiffList);
