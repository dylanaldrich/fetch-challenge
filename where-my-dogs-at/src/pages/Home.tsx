/* imports */
import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import '../App.scss';
import './Home.scss';
import LoginForm from '../components/LoginForm/LoginForm';
import { Image } from 'react-bootstrap';

/* Home Page Component */
const Home = () => {
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
