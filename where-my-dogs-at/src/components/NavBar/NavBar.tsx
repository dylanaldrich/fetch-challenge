import { Button, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';

import '../../App.scss';
import './NavBar.scss';
import AuthModel from '../../models/AuthModel';
import { user } from '../../jotai/atoms';

const NavBar = () => {
  const [activeUser, setUser] = useAtom(user);
  const navigate = useNavigate();

  function logout() {
    if (activeUser) {
      AuthModel.logout()
        .then((success: boolean) => {
          if (success) {
            setUser(null);
            navigate('/');
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
        <span className="d-none d-md-block">Where My Dogs At?</span>
        <span className="d-block d-md-none">WMDA?</span>
      </Navbar.Brand>

      {activeUser?.name && (
        <>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="me-2" />
          <Navbar.Collapse
            className="justify-content-end mt-2 mt-lg-0"
            id="basic-navbar-nav"
          >
            <div className="d-flex align-items-center justify-content-end">
              <div className="border-end d-none d-lg-block">
                <span className="pe-3">
                  <span className="d-none d-md-inline">Welcome, </span>
                  {activeUser.name}
                </span>
              </div>
              <Button
                onClick={logout}
                className="ms-2 me-3 btn-light d-none d-lg-block"
              >
                Log Out
              </Button>
              <div className="d-block d-lg-none text-end me-2">
                <p className="my-1">Logged in as: {activeUser.name}</p>
                <a onClick={logout} className="_log-out-link">
                  Log Out
                </a>
              </div>
            </div>
          </Navbar.Collapse>
        </>
      )}
    </Navbar>
  );
};

export default NavBar;
