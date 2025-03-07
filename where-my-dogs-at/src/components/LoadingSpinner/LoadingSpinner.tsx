import { Spinner } from 'react-bootstrap';
import './LoadingSpinner.scss';

const LoadingSpinner = () => (
  <Spinner animation="border" role="status">
    <span className="visually-hidden">Loading...</span>
  </Spinner>
);

export default LoadingSpinner;
