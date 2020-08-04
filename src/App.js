import React from 'react';
import { Resizable } from 're-resizable';
import { AppBar } from './components/appbar/AppBar';
import SelectRepo from './components/selectrepo/SelectRepo';
import { useSelector } from 'react-redux';

const App = () => {
  // const [showSidebar, setShowSidebar] = useState(false);
  const { popUpVisible } = useSelector((state) => state.View);

  return (
    <div style={{ height: '100%' }}>
      <AppBar />
      <Resizable defaultSize={{ width: '30%', height: '100%' }}></Resizable>

      {popUpVisible ? <SelectRepo /> : null}
    </div>
  );
};

export default App;
