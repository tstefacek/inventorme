import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navigation.css";

export default function Navigation() {
  const location = useLocation();
  const isRegistrationPage = location.pathname === "/register";
  const isLoginPage = location.pathname === "/login";
  const isAddItemPage = location.pathname === "/add";
  const isItemsViewPage = location.pathname === "/items";
  const isLandingPage = location.pathname === "/";

  const handleLogout = async () => {
    try {
      await localStorage.removeItem("token");
      await localStorage.removeItem("userUuid");
    } catch (error) {
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <nav>
      {isLandingPage && (
        <div className="landing-nav">
          <Link className="nav-link" to="/login">
            Login
          </Link>
          <Link className="nav-link" to="/register">
            Register
          </Link>
        </div>
      )}

      {isLoginPage && (
        <div className="logged-in-nav">
          <Link to="/">
            <img
              id="nav-logo"
              src="logo_transparent_nav.png"
              alt="logo"
              className="float-start"
            ></img>
          </Link>
          <Link className="nav-link" to="/register">
            Register
          </Link>
        </div>
      )}

      {isRegistrationPage && (
        <div className="logged-in-nav">
          <Link to="/">
            <img
              id="nav-logo"
              src="logo_transparent_nav.png"
              alt="logo"
              className="float-start"
            ></img>
          </Link>
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </div>
      )}

      {isAddItemPage && (
        <div className="logged-in-nav">
          <Link to="/">
            <img id="nav-logo" src="logo_transparent_nav.png" alt="logo"></img>
          </Link>
          <Link className="nav-link" onClick={handleLogout} to="">
            Log Out
          </Link>
        </div>
      )}

      {isItemsViewPage && (
        <div className="logged-in-nav">
          <Link to="/">
            <img id="nav-logo" src="logo_transparent_nav.png" alt="logo"></img>
          </Link>
          <div>
            <Link className="nav-link" onClick={handleLogout} to="">
              Log Out
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
