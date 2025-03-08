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
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Fetch dogs by breed
  function fetchDogs(breeds: string[], next?: string): void {
    if (breeds.length === 0) return;

    DogsModel.populateDogs({
      breeds,
      next,
    })
      .then((response) => {
        setDogs((prevDogs) => {
          const combinedDogs = next
            ? [...prevDogs, ...response.dogs]
            : [...prevDogs, ...response.dogs];
          return sortDogsByOrder(combinedDogs, sortOrder);
        });
        setNext(response.next);
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      });
  }

  // Sort dogs based on the sortOrder
  function sortDogsByOrder(dogs: Dog[], order: 'asc' | 'desc'): Dog[] {
    return dogs.sort((a, b) =>
      order === 'asc'
        ? a.breed.localeCompare(b.breed)
        : b.breed.localeCompare(a.breed),
    );
  }

  // Track breed changes
  useEffect(() => {
    if (selectedBreeds.length === 0) return;

    setError('');

    // Identify added and removed breeds
    const currentBreeds = new Set(selectedBreeds);
    const previousBreeds = new Set(dogs.map((dog) => dog.breed));

    const addedBreeds = selectedBreeds.filter(
      (breed) => !previousBreeds.has(breed),
    );
    const removedBreeds = Array.from(previousBreeds).filter(
      (breed) => !currentBreeds.has(breed),
    );

    // Fetch only new breeds
    if (addedBreeds.length > 0) fetchDogs(addedBreeds);

    // Remove dogs of deselected breeds
    if (removedBreeds.length > 0) {
      setDogs((prevDogs) =>
        prevDogs.filter((dog) => currentBreeds.has(dog.breed)),
      );
    }
  }, [selectedBreeds, sortOrder]);

  // Auto-select first breed if no breed is selected
  useEffect(() => {
    if (isLoggedIn && dogs.length === 0 && selectedBreeds.length === 0) {
      DogsModel.getBreeds()
        .then((breeds) => {
          if (breeds.length > 0) {
            setSelectedBreeds([breeds[0].name]); // Auto-select first breed
          }
        })
        .catch((error) => {
          console.error(error);
          setError(error.message);
        });
    }
  }, [isLoggedIn, dogs.length, selectedBreeds.length]);

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="_index-page d-flex flex-column flex-grow-1">
      <Container className="mt-3 mb-1">
        <div className="d-flex">
          <SearchBar
            setSelectedBreeds={setSelectedBreeds}
            setSortOrder={setSortOrder}
          />
        </div>
      </Container>

      {!error && dogs.length > 0 && <DogsGrid dogs={dogs} sort={sortOrder} />}

      {!error && dogs.length === 0 && (
        <div className="d-flex flex-column flex-grow-1 justify-content-center align-items-center">
          <LoadingSpinner />
          <h4 className="mt-4 fst-italic">*Blows dog whistle*</h4>
        </div>
      )}

      {error && <h4 className="text-danger">{error}</h4>}
    </div>
  );
};

export default Search;
