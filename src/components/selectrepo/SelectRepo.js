import React from 'react';
import { Overlay, Classes, Button, Intent, Toaster } from '@blueprintjs/core';
import { connect } from 'react-redux';
import { setFilePath, loadCommits } from '../../store/repo/Repo';

const { dialog } = window.require('electron').remote;

const style = {
  left: 'calc(50vw - 200px)',
  margin: '10vh 0',
  top: 0,
  width: '400px',
  backgroundColor: 'white',
};

class SelectRepo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filePath: '',
    };
  }
  toaster = (ref) => (this.toaster = ref);

  openPopUp = () => {
    dialog
      .showOpenDialog({
        title: 'Select a folder',
        properties: ['openDirectory'],
      })
      .then(({ filePaths }) => {
        this.setState({ filePath: filePaths[0] });
      });
  };

  closePopup = () => {
    const { filePath } = this.state;
    const { setFilePath, loadCommits } = this.props;

    if (filePath === '') {
      this.toaster.show({
        icon: 'warning-sign',
        intent: Intent.DANGER,
        message: 'You must select a directory',
      });
    } else {
      setFilePath(filePath);
      loadCommits();
    }
  };

  render() {
    return (
      <Overlay className={Classes.OVERLAY} isOpen={true}>
        <Toaster ref={this.toaster} />
        <div
          className={Classes.CARD + ' ' + Classes.ELEVATION_4}
          style={{ ...style }}
        >
          <div className={Classes.DIALOG_BODY}>
            <h3>Select repo directory</h3>
            <Button intent={Intent.PRIMARY} onClick={() => this.openPopUp()}>
              Select Git Repo
            </Button>
            <h5>Current Path: {this.state.filePath}</h5>
          </div>

          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button
              intent={Intent.SUCCESS}
              onClick={() => {
                this.closePopup();
              }}
            >
              Confirm
            </Button>
          </div>
        </div>
      </Overlay>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setFilePath: (filePath) => dispatch(setFilePath(filePath)),
    loadCommits: () => dispatch(loadCommits()),
  };
};

export default connect(null, mapDispatchToProps)(SelectRepo);
