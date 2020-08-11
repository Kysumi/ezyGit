import React from 'react';
import ReactList from 'react-list';
import { DiffListItem } from './DiffListItem';

class DiffList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 0,
      forcedOpenState: false,
    };
  }

  renderItem = (index, key) => {
    const { items } = this.props;
    const { forcedOpenState, width } = this.state;

    const diff = items[index];

    return (
      <div key={key}>
        <DiffListItem
          forcedOpenState={forcedOpenState}
          diff={diff}
          viewStyle={width > 1000 ? 'split' : 'unified'}
        />
      </div>
    );
  };

  componentDidMount() {
    this.setState({ width: this.divRef.clientWidth });
  }

  render() {
    const { items } = this.props;

    return (
      <div ref={(element) => (this.divRef = element)}>
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
