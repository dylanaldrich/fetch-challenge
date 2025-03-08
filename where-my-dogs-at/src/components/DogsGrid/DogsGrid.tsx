import { FC, useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { useAtom } from 'jotai';

import './DogsGrid.scss';
import DogsModel, { Dog } from '../../models/DogsModel';
import DogCard from '../DogCard/DogCard';
import MatchModal from '../MatchModal/MatchModal';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { favoriteDogIds } from '../../jotai/atoms';

interface DogsGridProps {
  dogs: Dog[];
  onLoadMore: (breed: string) => void;
}

const DogsGrid: FC<DogsGridProps> = ({ dogs, onLoadMore }) => {
  const [selectedDogIds, setSelectedDogIds] = useAtom(favoriteDogIds);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [moreDogsLoading, setMoreDogsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [match, setMatch] = useState<Dog>();

  function toggleSelection(id: string): void {
    setSelectedDogIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }

  function getMatch(): void {
    if (selectedDogIds.size === 0) return;
    setLoading(true);

    DogsModel.getMatch(Array.from(selectedDogIds))
      .then(async (response) => {
        if (response) {
          deselectAll();
          setMatch(response);
          setShowModal(true);
        }
      })
      .catch((error: { message: string }) => {
        setError(error.message);
        console.error(error);
      })
      .finally(() => setLoading(false));
  }

  function deselectAll(): void {
    setSelectedDogIds(new Set());
  }

  function handleHide(): void {
    setShowModal(false);
  }

  function getMoreDogs(): void {
    if (dogs.length === 0) return;
    setMoreDogsLoading(true);
    const lastDog = dogs[dogs.length - 1];
    onLoadMore(lastDog.breed);
  }

  useEffect(() => {
    setMoreDogsLoading(false);
  }, [dogs]);

  return (
    <>
      <Container className="mt-3 mb-5">
        <Row className="DogsGrid g-3 position-relative" data-testid="DogsGrid">
          {dogs.map((dog) => (
            <Col xs={12} sm={6} md={4} lg={3} key={dog.id}>
              <DogCard
                dog={dog}
                isSelected={selectedDogIds.has(dog.id)}
                toggleSelection={toggleSelection}
              />
            </Col>
          ))}
          <Col xs={12} sm={6} md={4} lg={3}>
            <Card
              className="h-100 shadow-sm _see-more-card"
              onClick={getMoreDogs}
            >
              <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                <Card.Title className="mb-3">Want more doggos?</Card.Title>
                {!moreDogsLoading && (
                  <FontAwesomeIcon
                    icon={faPlusCircle}
                    size="4x"
                    className="text-primary _plus-icon"
                  ></FontAwesomeIcon>
                )}
                {moreDogsLoading && (
                  <span className="text-primary">
                    <LoadingSpinner />
                  </span>
                )}
              </Card.Body>
            </Card>
          </Col>

          {selectedDogIds.size > 0 && (
            <Card className="w-75 text-center text-md-start border-primary shadow _selects-card">
              <Card.Body className="d-flex flex-column flex-md-row align-items-center justify-content-between px-2 px-sm-3">
                <div>
                  <Card.Text className="mb-0">
                    {selectedDogIds.size} dog
                    {selectedDogIds.size === 1 ? '' : 's'} selected. Ready to
                    find your match?
                  </Card.Text>
                  {error && <small className="text-danger">{error}</small>}
                </div>
                <div className="mt-2 mt-md-0">
                  <Button onClick={getMatch} disabled={loading}>
                    Match!
                    {loading && (
                      <span className="ms-1">
                        <LoadingSpinner size="sm" />
                      </span>
                    )}
                  </Button>
                  <Button onClick={deselectAll} className="btn-warning ms-2">
                    Deselect All
                  </Button>
                </div>
              </Card.Body>
            </Card>
          )}
        </Row>
      </Container>

      {match && (
        <MatchModal showModal={showModal} dog={match} handleHide={handleHide} />
      )}
    </>
  );
};

export default DogsGrid;
