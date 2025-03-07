import { FC, useState } from 'react';
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap';

import './DogsGrid.scss';
import { Dog } from '../../models/DogsModel';
import DogCard from '../DogCard/DogCard';

interface DogsGridProps {
  dogs: Dog[];
}

const DogsGrid: FC<DogsGridProps> = (props) => {
  const [selectedDogIds, setSelectedDogIds] = useState<Set<string>>(new Set());

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
    console.log('finding match...');
  }

  function deselectAll(): void {
    setSelectedDogIds(new Set());
  }

  return (
    <Container className="mt-3 mb-5 position-relative">
      <Row className="DogsGrid g-3" data-testid="DogsGrid">
        {props.dogs.map((dog, index) => {
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
            <Card.Text className="mb-0">
              {selectedDogIds.size} dog{selectedDogIds.size === 1 ? '' : 's'}{' '}
              selected. Ready to find your match?
            </Card.Text>
            <div>
              <Button onClick={getMatch}>Match!</Button>
              <Button onClick={deselectAll} className="btn-light ms-2">
                <Image src="xmark-regular.svg" height={25} />
              </Button>
            </div>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default DogsGrid;
