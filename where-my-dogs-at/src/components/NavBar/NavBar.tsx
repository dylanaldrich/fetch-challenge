import { Button, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import '../../App.scss';
import './NavBar.scss';
import AuthModel from '../../models/AuthModel';
import { useAtom } from 'jotai';
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
        <span className="d-none d-md-block">Where My Dogs At?</span>
        <span className="d-block d-md-none">WMDA?</span>
      </Navbar.Brand>

      {activeUser?.name && (
        <div className="d-flex align-items-center">
          <div className="border-end">
            <span className="pe-3">
              <span className="d-none d-md-inline">Welcome, </span>
              {activeUser.name}
            </span>
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
