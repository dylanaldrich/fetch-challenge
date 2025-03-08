import { FC } from 'react';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';

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
      'DogCard shadow-sm position-relative h-100 ' +
      (isSelected ? 'border-primary' : '')
    }
    onClick={() => toggleSelection(dog.id)}
  >
    <div className="_img-container">
      <Card.Img variant="top" src={dog.img} className="_dog-img" />
    </div>
    <Card.Body>
      <Card.Title>{dog.name}</Card.Title>

      <ul>
        <li>
          {dog.age === 0
            ? '< 1 year old'
            : dog.age === 1
            ? '1 year old'
            : `${dog.age} years old`}
        </li>
        <li>{dog.breed}</li>
        <li>Zip code {dog.zip_code}</li>
      </ul>

      <FontAwesomeIcon
        icon={solidHeart}
        size="lg"
        className={
          'position-absolute end-0 me-3 _heart ' +
          (isSelected ? 'd-block text-danger _selected' : '')
        }
      ></FontAwesomeIcon>
    </Card.Body>
  </Card>
);

export default DogCard;
