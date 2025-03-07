import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAtom } from 'jotai';

import '../App.scss';
import './Index.scss';
import { loggedIn } from '../jotai/atoms';
import DogsModel, { Dog } from '../models/DogsModel';
import DogsGrid from '../components/DogsGrid/DogsGrid';

const Index = () => {
  const [isLoggedIn] = useAtom(loggedIn);
  const [error, setError] = useState('');
  const [dogs, setDogs] = useState<Dog[]>([]);

  function starterDogs(): void {
    DogsModel.populateDogs()
      .then((response) => setDogs(response))
      .catch((error) => {
        console.error(error);
        setError(error.message);
      });
  }

  useEffect(() => {
    if (loggedIn && dogs.length === 0) {
      starterDogs();
    }
  }, [dogs.length]);

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="_index-page d-flex flex-column flex-grow-1">
      {dogs.length > 0 && !error ? (
        <DogsGrid dogs={dogs}></DogsGrid>
      ) : (
        <p>Loading doggos...</p>
      )}
    </div>
  );
};

export default Index;
