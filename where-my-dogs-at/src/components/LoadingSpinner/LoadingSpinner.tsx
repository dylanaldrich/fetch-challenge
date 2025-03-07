import { Spinner } from 'react-bootstrap';
import { FC } from 'react';

import './LoadingSpinner.scss';

export interface LoadingSpinnerProps {
  size?: 'sm';
}

const LoadingSpinner: FC<LoadingSpinnerProps> = ({ size }) => (
  <Spinner animation="border" role="status" size={size}>
    <span className="visually-hidden">Loading...</span>
  </Spinner>
);

export default LoadingSpinner;
