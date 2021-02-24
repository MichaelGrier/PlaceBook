import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../../context/auth-context';
import './NavLinks.css';

const NavLinks = (props) => {
  // get authentication context
  const auth = useContext(AuthContext);

  return (
    <ul className="nav-links">
      <li>
        <p className="nav-links__currentUser">{props.user}</p>
      </li>
      <li>
        <NavLink to="/" exact>
          ALL USERS
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink to={`/${auth.userId}/places`}>MY PLACES</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/places/new">ADD PLACE</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <button onClick={auth.logout}>LOGOUT</button>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">LOGIN</NavLink>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
