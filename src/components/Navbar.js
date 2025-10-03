import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import { useAuth } from "../context/AuthContext";
import { useLoginModal } from "../context/LoginModalContext";
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

function InfoIcon() {
  return (
    <svg
      className="icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16Zm0-9.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm.75 4V9.75h-1.5v4.25h1.5Z"
      />
    </svg>
  );
}

function CaretIcon({ expanded = false }) {
  return (
    <svg
      className={`icon caret-icon ${expanded ? "caret-icon--up" : ""}`.trim()}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M5.293 7.707 10 12.414l4.707-4.707-.707-.707L10 10.999 6 7l-.707.707Z"
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

const accountMenuLinks = [
  { label: "My Profile", to: "/profile" },
  { label: "My Results", to: "/results" },
  { label: "Transaction History", to: "/transactions" },
  { label: "Withdrawal", to: "/withdrawal" },
  { label: "My Limits", to: "/limits" },
  { label: "Self Exclusion", to: "/self-exclusion" }
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout, isAuthenticating } = useAuth();
  const accountMenuRef = useRef(null);
  const { openLoginModal } = useLoginModal();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await logout();
    setAccountMenuOpen(false);
    if (result?.ok !== false) {
      navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    setAccountMenuOpen(false);
  }, [location.pathname, user]);

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

  const handleAccountMenuItemSelect = () => {
    setAccountMenuOpen(false);
  };

  useEffect(() => {
    if (!accountMenuOpen) {
      return undefined;
    }

    const handleClickOutside = (event) => {
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target)) {
        setAccountMenuOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setAccountMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [accountMenuOpen]);

  const displayName = user?.name?.trim() || user?.email || "Player";
  const balanceDisplay = "$15.48";

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
            <div className="account-bar" aria-live="polite">
              <span className="account-greeting">Hey, {displayName}</span>
              <div className="account-balance" role="status" aria-label={`Current balance ${balanceDisplay}`}>
                <InfoIcon />
                <span className="account-balance__label">Balance</span>
                <span className="account-balance__amount">{balanceDisplay}</span>
                <CaretIcon />
              </div>
              <button type="button" className="btn btn-deposit">
                Deposit
              </button>
              <div className="account-menu" ref={accountMenuRef}>
                <button
                  type="button"
                  className="account-menu__toggle"
                  onClick={() => setAccountMenuOpen((previous) => !previous)}
                  aria-haspopup="true"
                  aria-expanded={accountMenuOpen}
                >
                  My Account
                  <CaretIcon expanded={accountMenuOpen} />
                </button>
                {accountMenuOpen && (
                  <div className="account-menu__panel" role="menu">
                    {accountMenuLinks.map(({ label, to }) => (
                      <Link
                        key={to}
                        to={to}
                        className="account-menu__item"
                        role="menuitem"
                        onClick={handleAccountMenuItemSelect}
                      >
                        {label}
                      </Link>
                    ))}
                    <button
                      type="button"
                      className="account-menu__item account-menu__item--danger"
                      onClick={handleLogout}
                      disabled={isAuthenticating}
                      role="menuitem"
                    >
                      {isAuthenticating ? "Signing out..." : "Log out"}
                    </button>
                  </div>
                )}
              </div>
              <LanguageSwitcher
                buttonClassName="account-language-toggle"
                menuAlignment="right"
                compact
              />
            </div>
          ) : (
            <div className="auth-actions">
              <LanguageSwitcher
                buttonClassName="btn btn-outline"
                menuAlignment="right"
                compact
              />
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => openLoginModal("login")}
              >
                Login
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => openLoginModal("register")}
              >
                Register
              </button>
            </div>
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
