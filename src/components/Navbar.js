import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import "./Navbar.css";

function HomeIcon() {
  return (
    <svg
      className="icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M12 3.172 3 11h2v9h6v-6h2v6h6v-9h2l-9-7.828Z"
      />
    </svg>
  );
}

function Navbar() {
  return (
    <header className="site-header">
      <div className="header-top">
        <Link to="/" className="header-logo">
          <img src={logo} alt="Zottry Logo" />
        </Link>
        <div className="header-actions">
          <Link className="btn btn-secondary" to="/register">Register</Link>
          <Link className="btn" to="/login">Login</Link>
          <button className="btn btn-outline" type="button">EN</button>
        </div>
      </div>
      <nav className="menu-bar">
        <ul>
          <li>
            <Link to="/">
              <HomeIcon />
              <span>Home</span>
            </Link>
          </li>
          <li><Link to="/all-lotteries">All Lotteries</Link></li>
          <li><Link to="/lottery-results">Lottery Results</Link></li>
          <li><Link to="/my-offers">My Offers</Link></li>
          <li><Link to="/promotions">Promotions</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
