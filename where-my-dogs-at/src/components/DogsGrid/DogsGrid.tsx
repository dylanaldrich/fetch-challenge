import { FC, useState, useMemo } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';

import './DogsGrid.scss';
import DogsModel, { Dog } from '../../models/DogsModel';
import DogCard from '../DogCard/DogCard';
import MatchModal from '../MatchModal/MatchModal';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

interface DogsGridProps {
  dogs: Dog[];
  sort: 'asc' | 'desc';
}

const DogsGrid: FC<DogsGridProps> = ({ dogs, sort }) => {
  const [selectedDogIds, setSelectedDogIds] = useState<Set<string>>(new Set());
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [match, setMatch] = useState<Dog>();

  // Ensure unique dogs and apply sorting
  const sortedDogs = useMemo(() => {
    const dogMap = new Map<string, Dog>();
    dogs.forEach((dog) => dogMap.set(dog.id, dog));

    const uniqueDogs = Array.from(dogMap.values());

    return uniqueDogs.sort((a, b) => {
      if (sort === 'asc') return a.name.localeCompare(b.name);
      return b.name.localeCompare(a.name);
    });
  }, [dogs, sort]);

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

  return (
    <>
      <Container className="mt-3 mb-5">
        <Row className="DogsGrid g-3 position-relative" data-testid="DogsGrid">
          {sortedDogs.map((dog, index) => (
            <Col xs={12} sm={6} md={4} lg={3} key={dog.id}>
              <span>{index + 1}</span>
              <DogCard
                dog={dog}
                isSelected={selectedDogIds.has(dog.id)}
                toggleSelection={toggleSelection}
              />
            </Col>
          ))}

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
