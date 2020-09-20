import { Button } from 'evergreen-ui';
import React, { ChangeEvent } from 'react';
import ReactDOM from 'react-dom';

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
    this.inputRef.current.webkitdirectory = true;
    this.inputRef.current.directory = true;
  }

  handleOpenPopUp = () => {
    console.log(this.inputRef.current);
    this.inputRef.current.click();
  };

  render() {
    return (
      <>
        <Button intent={'success'} onClick={this.handleOpenPopUp}>
          Select Git Repo
        </Button>
        <input style={{ display: 'none' }} type="file" ref={this.inputRef} />
      </>
    );
  }
}
