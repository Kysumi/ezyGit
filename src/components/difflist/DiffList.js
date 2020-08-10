import React from 'react';
import ReactList from 'react-list';
import { DiffListItem } from './DiffListItem';

class DiffList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      forcedOpenState: false,
    };
  }

  renderItem = (index, key) => {
    const { items } = this.props;
    const { forcedOpenState } = this.state;

    const diff = items[index];

    return (
      <div key={key}>
        <DiffListItem forcedOpenState={forcedOpenState} diff={diff} />
      </div>
    );
  };

  render() {
    const { items } = this.props;

    return (
      <div>
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
