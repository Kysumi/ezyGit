import React from 'react';
import ReactList from 'react-list';

class DiffList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      forceExpandedAllItems: false,
    };
  }

  renderItem() {
    return <div>new item heh</div>;
  }

  render() {
    const { changes } = this.props;
    return (
      <ReactList itemRenderer={this.renderItem} length={10} type="simple" />
    );
  }
}

export default DiffList;
