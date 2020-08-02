import React from 'react';
import { Mobile } from './Mobile';
import { Desktop } from './Desktop';
import { useDispatch, useSelector } from 'react-redux';

export const SideBar = ({ showSidebar, size, setShowSidebar }) => {
  const { isOpen } = useSelector((state) => state.isOpen);
  return (
    <>
      {!showSidebar || size !== 'small' ? (
        <Desktop showSidebar={showSidebar} />
      ) : (
        <Mobile setShowSidebar={setShowSidebar} />
      )}
    </>
  );
};
