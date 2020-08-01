import React from 'react';
import { Mobile } from './Mobile';
import { Desktop } from './Desktop';

export const SideBar = ({ showSidebar, size, setShowSidebar }) => {
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
