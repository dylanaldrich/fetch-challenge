import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { Container } from 'react-bootstrap';

import '../../App.scss';
import './Search.scss';
import { loggedIn } from '../../jotai/atoms';
import DogsModel, { Dog } from '../../models/DogsModel';
import DogsGrid from '../../components/DogsGrid/DogsGrid';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import SearchBar from '../../components/SearchBar/SearchBar';

const Search = () => {
  const [isLoggedIn] = useAtom(loggedIn);
  const [error, setError] = useState('');
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [next, setNext] = useState<string>('');
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);

  function starterDogs(): void {
    DogsModel.populateDogs()
      .then((response) => {
        setDogs(response.dogs);
        setNext(response.next);
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      });
  }

  function searchByBreeds(next?: string): void {
    DogsModel.populateDogs({
      breeds: selectedBreeds,
      next,
    })
      .then((response) => {
        const allDogs = next ? [...dogs, ...response.dogs] : response.dogs;
        setDogs(allDogs);
        setNext(response.next);
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      });
  }

  useEffect(() => {
    if (selectedBreeds.length > 0) {
      setError('');
      searchByBreeds();
    } else {
      starterDogs();
    }
  }, [selectedBreeds]);

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
      <Container className="mt-3 mb-1">
        <div className="d-flex">
          <SearchBar setSelectedBreeds={setSelectedBreeds}></SearchBar>
          {/* <Button onClick={() => searchByBreeds(next)}>More dogs</Button> */}
        </div>
      </Container>
      {!error && dogs.length > 0 && <DogsGrid dogs={dogs}></DogsGrid>}

      {!error && dogs.length === 0 && (
        <div className="d-flex flex-column flex-grow-1 justify-content-center align-items-center">
          <LoadingSpinner></LoadingSpinner>
          <h4 className="mt-4 fst-italic">*Blows dog whistle*</h4>
        </div>
      )}

      {error && <h4 className="text-danger">{error}</h4>}
    </div>
  );
};

export default Search;
