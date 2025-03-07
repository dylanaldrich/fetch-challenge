import { FC } from 'react';
import { Card, Image } from 'react-bootstrap';

import './DogCard.scss';
import { Dog } from '../../models/DogsModel';

interface DogCardProps {
  dog: Dog;
  isSelected: boolean;
  toggleSelection: (id: string) => void;
}

const DogCard: FC<DogCardProps> = ({ dog, isSelected, toggleSelection }) => (
  <Card
    className={
      'DogCard shadow-sm position-relative ' +
      (isSelected ? 'border-primary' : '')
    }
    onClick={() => toggleSelection(dog.id)}
  >
    <div className="_img-container">
      <Card.Img variant="top" src={dog.img} className="_dog-img" />
    </div>
    <Card.Body>
      <Card.Title>
        {dog.name} (
        {dog.age === 0
          ? '<1 year old'
          : dog.age === 1
          ? '1 year old'
          : `${dog.age} years old`}
        )
      </Card.Title>
      <Card.Text className="mb-0">{dog.breed}</Card.Text>
      <Image
        className={
          'position-absolute end-0 me-3 _heart ' +
          (isSelected ? 'd-block _red' : '_grey')
        }
        height={25}
        src={isSelected ? 'heart-solid.svg' : 'heart-regular.svg'}
      />
    </Card.Body>
  </Card>
);

export default DogCard;
