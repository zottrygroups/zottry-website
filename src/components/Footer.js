import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <span className="footer-logo">Zottry</span>
          <p>© {new Date().getFullYear()} Zottry Groups S.A. All rights reserved.</p>
        </div>
        <div className="footer-actions">
          <Link className="btn btn-secondary" to="/register">Register</Link>
          <Link className="btn" to="/login">Login</Link>
          <button className="btn btn-outline" type="button">EN</button>
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
