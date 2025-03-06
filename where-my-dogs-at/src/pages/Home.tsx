/* imports */
import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import '../App.scss';
import LoginForm from '../components/LoginForm/LoginForm';

/* Home Page Component */
const Home = () => {
  return (
    <Container fluid className="d-flex flex-column flex-grow-1">
      <Row className="d-flex flex-grow-1">
        <Col md={6} className="d-none d-md-block">
          Other stuf
        </Col>
        <Col
          md={6}
          className="d-flex justify-content-center align-items-center"
        >
          <LoginForm></LoginForm>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
