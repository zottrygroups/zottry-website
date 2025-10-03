import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLoginModal } from "../context/LoginModalContext";
import "./Footer.css";

function Footer() {
  const { user } = useAuth();
  const { openLoginModal } = useLoginModal();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <span className="footer-logo">Zottry</span>
          <p className="footer-copy">
            Making lottery play transparent and responsible. © {currentYear} Zottry Group S.A.
          </p>
        </div>
        <nav className="footer-nav" aria-label="Footer">
          <Link to="/about">About Us</Link>
          <Link to="/terms">Terms</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/responsible-play">Responsible Play</Link>
        </nav>
        <div className="footer-actions">
          {user ? (
            <span className="footer-user">Signed in as {user.name}</span>
          ) : (
            <>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => openLoginModal("register")}
              >
                Register
              </button>
              <button type="button" className="btn" onClick={() => openLoginModal("login")}>
                Login
              </button>
            </>
          )}
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-contact">
          <p>Email: support@zottry.com</p>
          <p>Phone: +1 (800) 555-0199</p>
        </div>
        <p className="footer-licence">Zottry operates under license No. 009731 issued in Curaçao.</p>
      </div>
    </footer>
  );
}

export default Footer;
