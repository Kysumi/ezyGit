import { Button } from 'evergreen-ui';
import React, { ChangeEvent } from 'react';

interface FileInputProps {
  onSelection: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default class FileInput extends React.Component<FileInputProps> {
  inputRef: any = null;

  constructor(props: FileInputProps) {
    super(props);

    this.inputRef = React.createRef();
  }

  componentDidMount() {
    this.inputRef.current.nwdirectory = true;
    // this.inputRef.current.directory = true;
  }

  handleOpenPopUp = () => {
    this.inputRef.current.click();
  };

  render() {
    const { onSelection } = this.props;

    return (
      <>
        <Button intent={'success'} onClick={this.handleOpenPopUp}>
          Select Git Repo
        </Button>
        <input
          onChange={onSelection}
          style={{ display: 'none' }}
          type="file"
          ref={this.inputRef}
        />
      </>
    );
  }
}
