import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLoginModal } from "../context/LoginModalContext";
import "./Footer.css";

function Footer() {
  const { user } = useAuth();
  const { openLoginModal } = useLoginModal();
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <span className="footer-logo">Zottry</span>
          <span className="footer-copy">© {new Date().getFullYear()} Zottry Groups S.A. All rights reserved.</span>
        </div>
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
              <button type="button" className="btn" onClick={() => openLoginModal("login") }>
                Login
              </button>
            </>
          )}
        </div>
      </div>
      <div className="footer-links">
        <Link to="/">Home</Link>
        <Link to="/all-lotteries">All Lotteries</Link>
        <Link to="/lottery-results">Lottery Results</Link>
        <Link to="/my-offers">My Offers</Link>
        <Link to="/promotions">Promotions</Link>
      </div>
      <div className="footer-contact">
        <p>Email: support@zottry.com</p>
        <p>Phone: +1 (800) 555-0199</p>
      </div>
    </footer>
  );
}

export default Footer;
