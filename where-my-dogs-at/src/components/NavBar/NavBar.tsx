import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
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
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary"
      data-testid="NavBar"
    >
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          Where My Dogs At?
        </Link>
        {userName && (
          <div>
            <span>{userName}</span>
            <Button onClick={logout} className="ms-2">
              Logout
            </Button>
          </div>
        )}
        {/* <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="#">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Features
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Pricing
            </a>
          </li>
        </ul>
        <span className="navbar-text">Navbar text with an inline element</span>
      </div> */}
      </div>
    </nav>
  );
};

export default NavBar;
