import React from 'react';
import { AppBar } from './components/appBar/AppBar';
import SelectRepoPopUp from './components/selectRepoPopUp/SelectRepoPopUp';
import { useSelector } from 'react-redux';
import { gitDirectorySelector } from './store/repo/RepoSelector';
import RightHandSide from './views/rightHandSide/RightHandSide';
import { LeftHandSide } from './views/leftHandSide/LestHandSide';
import OmniBar from './components/omniBar/OmniBar';
import { ThemeProvider } from 'styled-components';
import { COLORS } from './styles/style';

const contentStyle = {
  display: 'flex',
};

const theme = {
  mainColor: COLORS.WHITE,
};

const App = () => {
  const hasFilePath = useSelector(gitDirectorySelector);

  return (
    <ThemeProvider theme={theme}>
      <div style={{ height: '100%' }}>
        <OmniBar>
          <AppBar />

          <div style={contentStyle}>
            <LeftHandSide />
            <RightHandSide />
          </div>

          {hasFilePath ? null : <SelectRepoPopUp />}
        </OmniBar>
      </div>
    </ThemeProvider>
  );
};

export default App;
