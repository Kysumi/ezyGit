import React from 'react';
import { Resizable } from 're-resizable';
import { AppBar } from './components/appbar/AppBar';
import SelectRepo from './components/selectrepo/SelectRepo';
import { useSelector } from 'react-redux';
import { SideList } from './components/sidelist/SideList';

const App = () => {
  const { popUpVisible } = useSelector((state) => state.View);

  return (
    <div style={{ height: '100%' }}>
      <AppBar />
      <Resizable
        defaultSize={{ width: '30%', height: '100%' }}
        style={{ backgroundColor: 'yellow' }}
      >
        <SideList />
      </Resizable>

      {popUpVisible ? <SelectRepo /> : null}
    </div>
  );
};

export default App;
