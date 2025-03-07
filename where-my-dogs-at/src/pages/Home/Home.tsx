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
        <Col md={6} className="d-none d-md-block _image-container px-0">
          <Image src="/dog_splash.png" fluid />
        </Col>
        <Col md={6}>
          <div className="d-flex justify-content-center _login-form-container">
            <LoginForm></LoginForm>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
