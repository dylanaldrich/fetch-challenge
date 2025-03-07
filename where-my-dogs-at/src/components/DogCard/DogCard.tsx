import { FC, useState } from 'react';
import { Card } from 'react-bootstrap';

import './DogCard.scss';
import { Dog } from '../../models/DogsModel';

interface DogCardProps {
  dog: Dog;
  trackSelections: (id: string) => void;
}

const DogCard: FC<DogCardProps> = ({ dog, trackSelections }) => {
  const [selected, setSelected] = useState(false);

  function toggleSelection(): void {
    setSelected(!selected);
    trackSelections(dog.id);
  }

  return (
    <Card
      className={'DogCard shadow-sm ' + (selected ? 'border-primary' : '')}
      onClick={toggleSelection}
    >
      <div className="_img-container">
        <Card.Img variant="top" src={dog.img} className="_dog-img" />
      </div>
      <Card.Body className="position-relative">
        <Card.Title>
          {dog.name} (
          {dog.age === 0
            ? '<1 year old'
            : dog.age === 1
            ? '1 year old'
            : `${dog.age} years old`}
          )
        </Card.Title>

        <Card.Text>{dog.id}</Card.Text>
        <Card.Text className="mb-0">{dog.breed}</Card.Text>
        <p
          className={
            'position-absolute end-0 _hovered me-3 ' +
            (selected ? 'text-danger d-block' : 'text-primary')
          }
        >
          {'<3'}
        </p>
      </Card.Body>
    </Card>
  );
};

export default DogCard;
