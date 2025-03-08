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

  function fetchDogs(breeds: string[], next?: string): void {
    if (breeds.length === 0) return;

    DogsModel.populateDogs({
      breeds,
      next,
    })
      .then((response) => {
        setDogs((prevDogs) => {
          const combinedDogs = [...prevDogs, ...response.dogs];
          const uniqueDogs = removeDuplicates(combinedDogs);
          return sortDogsByOrder(uniqueDogs, sortOrder);
        });
        setNext(response.next);
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      });
  }

  function removeDuplicates(dogs: Dog[]): Dog[] {
    const dogMap = new Map<string, Dog>();
    dogs.forEach((dog) => dogMap.set(dog.id, dog));

    return Array.from(dogMap.values());
  }

  function onLoadMore(breed: string): void {
    fetchDogs([breed], next);
  }

  function sortDogsByOrder(dogs: Dog[], order: 'asc' | 'desc'): Dog[] {
    return [...dogs].sort((a, b) =>
      order === 'asc'
        ? a.breed.localeCompare(b.breed)
        : b.breed.localeCompare(a.breed),
    );
  }

  useEffect(() => {
    setDogs((prevDogs) => sortDogsByOrder(prevDogs, sortOrder));
  }, [sortOrder]);

  useEffect(() => {
    if (selectedBreeds.length === 0) return;

    setError('');

    const currentBreeds = new Set(selectedBreeds);
    const previousBreeds = new Set(dogs.map((dog) => dog.breed));

    const addedBreeds = selectedBreeds.filter(
      (breed) => !previousBreeds.has(breed),
    );
    const removedBreeds = Array.from(previousBreeds).filter(
      (breed) => !currentBreeds.has(breed),
    );

    if (addedBreeds.length > 0) fetchDogs(addedBreeds);

    if (removedBreeds.length > 0) {
      setDogs((prevDogs) =>
        prevDogs.filter((dog) => currentBreeds.has(dog.breed)),
      );
    }
  }, [selectedBreeds, sortOrder]);

  useEffect(() => {
    if (isLoggedIn && dogs.length === 0 && selectedBreeds.length === 0) {
      DogsModel.getBreeds()
        .then((breeds) => {
          if (breeds.length > 0) {
            setSelectedBreeds([breeds[0].name]);
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

      {!error && dogs.length > 0 && (
        <DogsGrid dogs={dogs} onLoadMore={onLoadMore} />
      )}

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
