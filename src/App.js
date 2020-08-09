import React from 'react';
import { Resizable } from 're-resizable';
import { AppBar } from './components/appBar/AppBar';
import SelectRepoPopUp from './components/selectRepoPopUp/SelectRepoPopUp';
import { useSelector } from 'react-redux';
import { CommitList } from './components/commitlist/CommitList';
import { filePathSelector } from './store/repo/RepoSelector';
import { RightHandSide } from './views/rightHandSide/RightHandSide';

const contentStyle = {
  display: 'flex',
};

const App = () => {
  const hasFilePath = useSelector(filePathSelector);

  return (
    <div style={{ height: '100%' }}>
      <AppBar />

      <div style={contentStyle}>
        <Resizable defaultSize={{ width: '30%', height: '100%' }}>
          <CommitList />
        </Resizable>
        <RightHandSide />
      </div>

      {hasFilePath ? null : <SelectRepoPopUp />}
    </div>
  );
};

export default App;
