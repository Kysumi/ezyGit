import React from 'react';
import { Resizable } from 're-resizable';
import { AppBar } from './components/appbar/AppBar';
import SelectRepo from './components/selectrepo/SelectRepo';
import { useSelector } from 'react-redux';
import { SideList } from './components/sidelist/SideList';
import { filePathSelector } from './store/repo/RepoSelector';

const App = () => {
  const hasFilePath = useSelector(filePathSelector);

  return (
    <div style={{ height: '100%' }}>
      <AppBar />
      <Resizable defaultSize={{ width: '30%', height: '100%' }}>
        <SideList />
      </Resizable>
      {hasFilePath ? null : <SelectRepo />}
    </div>
  );
};

export default App;
