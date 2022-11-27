import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';
// import 'bootstrap/dist/css/bootstrap.css';

const Navbar = () => {
  const { state, dispatch } = useContext(UserContext);

  const RenderMenu = () => {
    if (state) {
      return (
        <>
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about">About</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/contact">Contact</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/logout">Logout</Link>
          </li>
        </>
      )
    } else {
      return (
        <>
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about">About</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/contact">Contact</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/signin">Login</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/signup">Registration</Link>
          </li>
        </>
      )
    }
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-warning fs-5">
        <div className="container-fluid">
          <Link className="navbar-brand fs-4 ms-4" to="/">MERN Stack</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto me-5 mb-2 mb-lg-0 ">

              <RenderMenu />

            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar;