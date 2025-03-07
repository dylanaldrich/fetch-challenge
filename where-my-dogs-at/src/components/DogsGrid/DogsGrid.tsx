import { FC, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import './DogsGrid.scss';
import { Dog } from '../../models/DogsModel';
import DogCard from '../DogCard/DogCard';

interface DogsGridProps {
  dogs: Dog[];
}

const DogsGrid: FC<DogsGridProps> = (props) => {
  const [selectedDogIds, setSelectedDogIds] = useState<Set<string> | null>(
    null,
  );

  function toggleSelection(id: string): void {
    if (!selectedDogIds) {
      const newSet = new Set<string>();
      newSet.add(id);
      setSelectedDogIds(newSet);
      return;
    }

    if (selectedDogIds.has(id)) {
      selectedDogIds.delete(id);
    } else {
      selectedDogIds.add(id);
    }
    setSelectedDogIds(selectedDogIds);
  }

  return (
    <Container className="mt-3 mb-5">
      <Row className="DogsGrid g-3" data-testid="DogsGrid">
        {props.dogs.map((dog) => {
          return (
            <Col xs={'auto'} sm={6} md={4} lg={3} key={dog.id}>
              <DogCard dog={dog} trackSelections={toggleSelection}></DogCard>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default DogsGrid;
