/* imports */
import React from 'react';
import { useRecoilValue } from 'recoil';
import { Navigate } from 'react-router-dom';

import '../App.scss';
import { userState } from '../recoil/atoms';

/* Home Page Component */
const Index = () => {
  const loggedIn = !!useRecoilValue(userState);

  if (!loggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div>All dogs go here</div>
    </>
  );
};

export default Index;
