/* imports */
import { Row, Col, Container, Image } from 'react-bootstrap';

import '../../App.scss';
import './Home.scss';
import LoginForm from '../../components/LoginForm/LoginForm';
import { useAtom } from 'jotai';
import { loggedIn } from '../../jotai/atoms';
import { Navigate } from 'react-router-dom';

/* Home Page Component */
const Home = () => {
  const [isLoggedIn] = useAtom(loggedIn);

  if (isLoggedIn) {
    return <Navigate to="/dogs/search" />;
  }

  return (
    <Container fluid className="d-flex flex-column flex-grow-1">
      <Row className="d-flex flex-grow-1">
        <Col md={6} className="d-none d-md-block _image-container px-0"></Col>
        <Col md={6}>
          <div className="d-flex flex-column align-items-center justify-content-md-center mt-5 mt-md-0 h-100">
            <Image
              src="/dog_square.png"
              roundedCircle
              className="d-md-none mb-4 mt-5 mt-md-0"
              height={200}
            ></Image>
            <LoginForm></LoginForm>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
