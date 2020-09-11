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

const Container = styled.div`
  display: grid;
  grid-template-columns: 30% 70%;
`;

const AppBarContainer = styled.div`
  padding-bottom: 1rem;
`;

const theme = {
  mainColor: COLORS.WHITE,
};

const StyledDiv = styled.div`
  height: 100vh;
  background-color: ${(props) => props.theme.mainColor};
  padding: 1rem;
  box-sizing: border-box;
`;

const App = () => {
  const hasFilePath = useSelector(gitDirectorySelector);

  return (
    <ThemeProvider theme={theme}>
      <StyledDiv>
        <OmniBar>
          <AppBarContainer>
            <AppBar />
          </AppBarContainer>
          <Container>
            <LeftHandSide />
            <RightHandSide />
          </Container>

          {hasFilePath ? null : <SelectRepoPopUp />}
        </OmniBar>
      </StyledDiv>
    </ThemeProvider>
  );
};

export default App;
