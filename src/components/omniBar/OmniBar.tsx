import { configure, HotKeys } from 'react-hotkeys';
import React from 'react';
import { Omnibar } from '@blueprintjs/select';
import { MenuItem } from '@blueprintjs/core';

configure({
  ignoreEventsCondition: (event) => {
    return false;
  },
});

class OmniBarTest extends React.Component {
  state = {
    isOpen: false,
  };

  handlers = {
    OPEN_OMNI_BAR: () => {
      const { isOpen } = this.state;
      this.setState({ isOpen: !isOpen });
      console.log('hit!!');
    },
    EXIT_OMNI: () => {
      this.setState({ isOpen: false });
      console.log('escaping');
    },
  };

  keyMap = {
    OPEN_OMNI_BAR: 'ctrl+p',
    EXIT_OMNI: 'escape',
  };

  renderItem = (item: string) => {
    return <MenuItem key={item} text={item} />;
  };

  render() {
    const { isOpen } = this.state;

    return (
      <div>
        <HotKeys keyMap={this.keyMap} handlers={this.handlers}>
          <Omnibar
            onItemSelect={() => console.log('Temp')}
            items={['fetch', 'pull', 'push', 'create branch']}
            itemRenderer={this.renderItem}
            isOpen={isOpen}
            noResults={<MenuItem disabled={true} text="No results." />}
          />

          {this.props.children}
        </HotKeys>
      </div>
    );
  }
}

export { OmniBarTest };
