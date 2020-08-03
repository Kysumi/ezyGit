import React, { useState } from 'react';
import { Resizable } from 're-resizable';
import { AppBar } from './components/appbar/AppBar';
import { FolderPicker } from './components/folderpicker/FolderPicker';

function App() {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <div style={{ height: '100%' }}>
      <AppBar />
      <Resizable defaultSize={{ width: '30%', height: '100%' }}></Resizable>
      <FolderPicker />
    </div>
  );
}

export default App;
