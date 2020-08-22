import React from 'react';
import { AppBar } from './components/appBar/AppBar';
import SelectRepoPopUp from './components/selectRepoPopUp/SelectRepoPopUp';
import { useSelector } from 'react-redux';
import { gitDirectorySelector } from './store/repo/RepoSelector';
import RightHandSide from './views/rightHandSide/RightHandSide';
import { LeftHandSide } from './views/leftHandSide/LestHandSide';

const contentStyle = {
  display: 'flex',
};

const App = () => {
  const hasFilePath = useSelector(gitDirectorySelector);

  return (
    <div style={{ height: '100%' }}>
      <AppBar />

      <div style={contentStyle}>
        <LeftHandSide />
        <RightHandSide />
      </div>

      {hasFilePath ? null : <SelectRepoPopUp />}
    </div>
  );
};

export default App;
