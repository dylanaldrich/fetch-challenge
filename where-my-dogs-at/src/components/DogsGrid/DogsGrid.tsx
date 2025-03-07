import { FC, useState } from 'react';
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap';

import './DogsGrid.scss';
import DogsModel, { Dog } from '../../models/DogsModel';
import DogCard from '../DogCard/DogCard';
import MatchModal from '../MatchModal/MatchModal';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

interface DogsGridProps {
  dogs: Dog[];
}

const DogsGrid: FC<DogsGridProps> = (props) => {
  const [selectedDogIds, setSelectedDogIds] = useState<Set<string>>(new Set());
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    DogsModel.getMatch(Array.from(selectedDogIds))
      .then(async (response) => {
        if (response) {
          deselectAll();
          await setMatch(response);
          setLoading(false);
          setShowModal(true);
        }
      })
      .catch((error: { message: string }) => {
        setLoading(false);
        setError(error.message);
        console.error(error);
      });
  }

  function deselectAll(): void {
    setSelectedDogIds(new Set());
  }

  function handleHide(): void {
    setShowModal(false);
  }

  return (
    <>
      <Container className="mt-3 mb-5 position-relative">
        <Row className="DogsGrid g-3" data-testid="DogsGrid">
          {props.dogs.map((dog) => {
            return (
              <Col xs={'auto'} sm={6} md={4} lg={3} key={dog.id}>
                <DogCard
                  dog={dog}
                  isSelected={selectedDogIds.has(dog.id)}
                  toggleSelection={toggleSelection}
                ></DogCard>
              </Col>
            );
          })}
        </Row>

        {selectedDogIds.size > 0 && (
          <Card className="w-50 border-primary shadow _selects-card">
            <Card.Body className="d-flex align-items-center justify-content-between">
              <div>
                <Card.Text className="mb-0">
                  {selectedDogIds.size} dog
                  {selectedDogIds.size === 1 ? '' : 's'} selected. Ready to find
                  your match?
                </Card.Text>
                {error && <small className="text-danger">{error}</small>}
              </div>
              <div>
                <Button onClick={getMatch} disabled={loading}>
                  Match!
                  {loading && (
                    <span className="ms-1">
                      <LoadingSpinner size="sm"></LoadingSpinner>
                    </span>
                  )}
                </Button>
                <Button onClick={deselectAll} className="btn-light ms-2">
                  <Image src="xmark-regular.svg" height={25} />
                </Button>
              </div>
            </Card.Body>
          </Card>
        )}
      </Container>
      {match && (
        <MatchModal
          showModal={showModal}
          dog={match}
          handleHide={handleHide}
        ></MatchModal>
      )}
    </>
  );
};

export default DogsGrid;
