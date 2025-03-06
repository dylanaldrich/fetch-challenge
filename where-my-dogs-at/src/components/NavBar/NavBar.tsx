import React, { FC } from 'react';
import '../../App.scss';
import './NavBar.scss';
import { Link } from 'react-router-dom';

interface NavBarProps {}

const NavBar: FC<NavBarProps> = () => (
  <nav
    className="navbar navbar-expand-lg bg-body-tertiary"
    data-testid="NavBar"
  >
    <div className="container-fluid">
      <Link to="/" className="navbar-brand">
        Where My Dogs At?
      </Link>
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

export default NavBar;
