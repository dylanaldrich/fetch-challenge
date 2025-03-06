import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button, Nav, Navbar } from 'react-bootstrap';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

import '../../App.scss';
import './NavBar.scss';
import { userState } from '../../recoil/atoms';
import AuthModel from '../../models/AuthModel';

interface NavBarProps {}

const NavBar: FC<NavBarProps> = () => {
  const userName = useRecoilValue(userState);
  const setUser = useSetRecoilState(userState);
  const navigate = useNavigate();

  function logout() {
    if (userName) {
      AuthModel.logout()
        .then((success: boolean) => {
          if (success) {
            setUser(null);
            navigate('/');
            // redirect to home page
          }
        })
        .catch((error) => {
          alert(error.message);
          console.error(error);
        });
    }
  }

  return (
    <Navbar
      fixed="top"
      expand="lg"
      className="bg-body-tertiary shadow-sm d-flex align-items-center justify-content-between"
    >
      <Navbar.Brand href="/" className="ms-3">
        Where My Dogs At?
      </Navbar.Brand>

      {userName && (
        <div className="d-flex align-items-center">
          <div className="border-end">
            <span className="pe-2">Welcome, {userName}</span>
          </div>
          <Button onClick={logout} className="ms-2 me-3 btn-light">
            Logout
          </Button>
        </div>
      )}
    </Navbar>
  );
};

export default NavBar;
