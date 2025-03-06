import React, { FC } from 'react';
import './LoginForm.scss';

interface LoginFormProps {}

const LoginForm: FC<LoginFormProps> = () => (
  <div className="LoginForm" data-testid="LoginForm">
    LoginForm Component
  </div>
);

export default LoginForm;
