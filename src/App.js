import React, { useState } from 'react';
import { Resizable } from 're-resizable';
import { AppBar } from './components/appbar/AppBar';
import { SelectRepo } from './components/selectrepo/SelectRepo';

function App() {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <div style={{ height: '100%' }}>
      <AppBar />
      <Resizable defaultSize={{ width: '30%', height: '100%' }}></Resizable>
      <SelectRepo />
    </div>
  );
}

export default App;
