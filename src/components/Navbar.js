import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../assets/logo.svg";
import { useAuth } from "../context/AuthContext";
import LanguageSwitcher from "./LanguageSwitcher";
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

function MenuIcon({ isOpen }) {
  return isOpen ? (
    <svg
      className="icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M6.343 5.929 5.929 6.343 11.586 12l-5.657 5.657.414.414L12 12.414l5.657 5.657.414-.414L12.414 12l5.657-5.657-.414-.414L12 11.586 6.343 5.929Z"
      />
    </svg>
  ) : (
    <svg
      className="icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M4 6h16v1.5H4V6Zm0 5.25h16v1.5H4v-1.5ZM4 16.5h16V18H4v-1.5Z"
      />
    </svg>
  );
}

const navItems = [
  { to: "/all-lotteries", label: "All Lotteries" },
  { to: "/lottery-results", label: "Lottery Results" },
  { to: "/my-offers", label: "My Offers" },
  { to: "/promotions", label: "Promotions" }
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout, isAuthenticating } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const handleToggle = () => {
    setMenuOpen((previous) => !previous);
  };

  const handleCloseOnEscape = (event) => {
    if (event.key === "Escape") {
      setMenuOpen(false);
    }
  };

  const handleNavLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <header className="site-header">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <div className="header-top">
        <Link to="/" className="header-logo">
          <img src={logo} alt="Zottry Logo" />
        </Link>
        <div className="header-actions">
          {user ? (
            <>
              <span className="user-chip" aria-live="polite">
                Hi, {user.name?.split(" ")[0] || "Player"}
              </span>
              <Link className="btn btn-secondary" to="/my-offers">
                My Offers
              </Link>
              <LanguageSwitcher
                buttonClassName="btn btn-outline"
                menuAlignment="right"
                compact
              />
              <button
                className="btn btn-outline"
                type="button"
                onClick={handleLogout}
                disabled={isAuthenticating}
              >
                {isAuthenticating ? "Signing out..." : "Logout"}
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-secondary" to="/register">
                Register
              </Link>
              <Link className="btn" to="/login">
                Login
              </Link>
              <LanguageSwitcher
                buttonClassName="btn btn-outline"
                menuAlignment="right"
                compact
              />
            </>
          )}
          <button
            className="btn btn-outline menu-toggle"
            type="button"
            onClick={handleToggle}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
          >
            <MenuIcon isOpen={menuOpen} />
            <span className="visually-hidden">
              {menuOpen ? "Close navigation" : "Open navigation"}
            </span>
          </button>
        </div>
      </div>
      <nav
        className={`menu-bar ${menuOpen ? "is-open" : ""}`}
        id="primary-navigation"
        aria-label="Primary"
        onKeyDown={handleCloseOnEscape}
      >
        <ul>
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`.trim()
              }
              onClick={handleNavLinkClick}
            >
              <HomeIcon />
              <span>Home</span>
            </NavLink>
          </li>
          {navItems.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`.trim()
                }
                onClick={handleNavLinkClick}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
