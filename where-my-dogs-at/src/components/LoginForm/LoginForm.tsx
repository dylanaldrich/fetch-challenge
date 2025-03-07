import { FormEvent, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';

import './LoginForm.scss';
import AuthModel from '../../models/AuthModel';
import { user } from '../../jotai/atoms';

interface LoginResponse {
  name: string;
}

const LoginForm = () => {
  const [error, setError] = useState('');
  const [, setUser] = useAtom(user);
  const navigate = useNavigate();

  function login(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name')?.toString().trim();
    const email = formData.get('email')?.toString().trim();

    if (name && email) {
      AuthModel.login({ name, email })
        .then((response: LoginResponse) => {
          if (response.name) {
            setUser({ name });
            navigate('/dogs/search');
          }
        })
        .catch((error: { message: string }) => {
          setError(error.message);
          console.error(error);
        });
    } else {
      setError('Hmm... double check your name and email, please.');
    }
  }

  function resetError(): void {
    setError('');
  }

  return (
    <div className="_login-form">
      <h1 className="text-center">Log In</h1>
      <Form onSubmit={login} onChange={resetError}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name="name" placeholder="Enter your name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter your email"
          />
        </Form.Group>

        <Form.Text className="d-block mb-3 text-muted">
          We'll never share your data with anyone else.
        </Form.Text>

        <Button variant="primary" type="submit">
          Submit
        </Button>
        {error && <p className="text-danger mt-3 text-wrap">{error}</p>}
      </Form>
    </div>
  );
};

export default LoginForm;
