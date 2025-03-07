import { Navigate } from 'react-router-dom';
import { useAtom } from 'jotai';

import '../App.scss';
import { loggedIn } from '../jotai/atoms';

const Index = () => {
  const [isLoggedIn] = useAtom(loggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div>All dogs go here</div>
    </>
  );
};

export default Index;
