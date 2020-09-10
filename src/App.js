import React from 'react';
import { AppBar } from './components/appBar/AppBar';
import SelectRepoPopUp from './components/selectRepoPopUp/SelectRepoPopUp';
import { useSelector } from 'react-redux';
import { gitDirectorySelector } from './store/repo/RepoSelector';
import RightHandSide from './views/rightHandSide/RightHandSide';
import { LeftHandSide } from './views/leftHandSide/LestHandSide';
import OmniBar from './components/omniBar/OmniBar';
import styled, { ThemeProvider } from 'styled-components';
import { COLORS } from './styles/style';

const contentStyle = {
  display: 'flex',
};

const theme = {
  mainColor: COLORS.WHITE,
};

const StyledDiv = styled.div`
  height: 100%;
  background-color: ${(props) => props.theme.mainColor};
`;

const WrapperPadding = styled.div`
  padding: 15px;
`;

const App = () => {
  const hasFilePath = useSelector(gitDirectorySelector);

  return (
    <ThemeProvider theme={theme}>
      <StyledDiv>
        <WrapperPadding>
          <OmniBar>
            <AppBar />

            <div style={contentStyle}>
              <LeftHandSide />
              <RightHandSide />
            </div>

            {hasFilePath ? null : <SelectRepoPopUp />}
          </OmniBar>
        </WrapperPadding>
      </StyledDiv>
    </ThemeProvider>
  );
};

export default App;
