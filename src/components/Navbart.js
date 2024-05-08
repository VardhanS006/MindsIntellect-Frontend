import React, { useEffect, useState } from 'react';
import Logoimg from '../assets/logo512.png';
import '../styles/navbar.css';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {

  const navigate = useNavigate();

  const [token, setToken] = useState('');
  const [loggedin, setLoggedin] = useState(false);

  const logout = () => {
    localStorage.clear();
  };

  useEffect(() => {

    setToken(localStorage.getItem('token') !== null ? localStorage.getItem('token') : '');

    if (token === '' && !localStorage.getItem('token')) {
      setLoggedin(false);
      // navigate('/login');
    }
    else {
      if (token !== undefined && token !== '') {
        setLoggedin(true);
      }
      else{
        setLoggedin(false);
      }
    }
  }, [token,loggedin,navigate])
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={Logoimg} alt='Logo Img' style={{ maxHeight: "40px" }} />
            <span className='p-2 m-2'>MindsIntellect</span>
          </Link>

          <div className="collapse navbar-collapse my-auto" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-1 px-5" style={{ fontSize: "20px" }}>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/plans">
                  Plan
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/contact">
                  Contact Us
                </Link>
              </li>
            </ul>
            {loggedin === false ?
              <div className="d-flex align-items-center">
                <Link to={"/login"}>
                  <button name='loginbtn' className="custom-button primary-button mx-2 rounded">
                    <span className="button-text">Login</span>
                  </button>
                </Link>
                <Link to={"/register"}>
                  <button name='registerbtn' className="custom-button secondary-button mx-2 rounded">
                    <span className="button-text">Register</span>
                  </button>
                </Link>
              </div>
              :
              <div className="d-flex align-items-center">
                <Link to={"/login"}>
                  <span className="button-text" onClick={()=>logout()}>Logout</span>
                </Link>
              </div>
            }
          </div>
        </div>
      </nav>
    </div>
  );
}
