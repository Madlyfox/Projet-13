import logo from "../img/argentBankLogo.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { faSignIn } from "@fortawesome/free-solid-svg-icons";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectCurrentData, logout } from "../features/auth/authSlice";

import { NavLink } from "react-router-dom";

import "../sass/navbar.scss";

const Navbar = () => {
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(logout());
  };

  const user = useSelector(selectCurrentData);

  if (!user.email) {
    return (
      <div className="navbar">
        <div className="logo">
          <img src={logo} className="app-logo" alt="logo" />
        </div>
        <div className="links">
          <NavLink to="/login" className="link">
            <FontAwesomeIcon icon={faUserCircle} />
            Sign In
          </NavLink>

          <NavLink to="/signup" className="link">
            <FontAwesomeIcon icon={faSignIn} />
            Register
          </NavLink>
        </div>
      </div>
    );
  } else {
    return (
      <div className="navbar">
        <div className="logo">
          <img src={logo} className="app-logo" alt="logo" />
        </div>
        <div className="links">
          <div className="link">
            <FontAwesomeIcon icon={faUserCircle} />
            {user.firstName}
          </div>

          <NavLink to="/" className="link" onClick={logOut}>
            <FontAwesomeIcon icon={faSignOut} />
            Logout
          </NavLink>
        </div>
      </div>
    );
  }
};

export default Navbar;
