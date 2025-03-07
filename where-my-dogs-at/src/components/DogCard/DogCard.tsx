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
      'DogCard shadow-sm position-relative ' +
      (isSelected ? 'border-primary' : '')
    }
    onClick={() => toggleSelection(dog.id)}
  >
    <div className="_img-container">
      <Card.Img variant="top" src={dog.img} className="_dog-img" />
    </div>
    <Card.Body>
      <Card.Title>{dog.name}</Card.Title>
      <Card.Text>
        <ul>
          <li>
            {dog.age === 0
              ? '< 1 year old'
              : dog.age === 1
              ? '1 year old'
              : `${dog.age} years old`}
          </li>
          <li>{dog.breed}</li>
        </ul>
      </Card.Text>
      <FontAwesomeIcon
        icon={isSelected ? solidHeart : regularHeart}
        size="lg"
        className={
          'position-absolute end-0 me-3 _heart text-danger ' +
          (isSelected ? 'd-block' : '')
        }
      ></FontAwesomeIcon>
    </Card.Body>
  </Card>
);

export default DogCard;
