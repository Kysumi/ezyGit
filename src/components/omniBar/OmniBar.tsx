import { configure, HotKeys } from 'react-hotkeys';
import React from 'react';
import { Omnibar } from '@blueprintjs/select';
import { MenuItem } from '@blueprintjs/core';
import { connect } from 'react-redux';
import { setOmniBarIsOpen } from '../../store/view/View';

configure({
  ignoreEventsCondition: () => {
    return false;
  },
});

export interface OmniBarProps {
  setOmnibarOpen: (shouldOpen: boolean) => void;
}

class OmniBar extends React.Component<OmniBarProps> {
  state = {
    isOpen: false,
  };

  handlers = {
    OPEN_OMNI_BAR: () => {
      const { setOmnibarOpen } = this.props;
      setOmnibarOpen(true);

      this.setState({ isOpen: true });
    },
    EXIT_OMNI: () => {
      const { setOmnibarOpen } = this.props;
      setOmnibarOpen(false);

      this.setState({ isOpen: false });
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

export { OmniBar };

const mapDispatchToProps = (dispatch: any) => {
  return {
    setOmnibarOpen: (shouldOpen: boolean) =>
      dispatch(setOmniBarIsOpen(shouldOpen)),
  };
};

export default connect(null, mapDispatchToProps)(OmniBar);
