import React from 'react';
import ReactList from 'react-list';
import DiffListItem from './DiffListItem';
import { StageButton } from './buttons/StageButton';
import { DiscardButton } from './buttons/DiscardButton';

class DiffList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 0,
    };
  }

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
          <StageButton />
          <DiscardButton />
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

export default DiffList;
